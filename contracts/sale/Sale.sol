// SPDX-License-Identifier: CAL
pragma solidity ^0.8.10;

import {Cooldown} from "../cooldown/Cooldown.sol";

import "../math/FixedPointMath.sol";
import "../vm/RainVM.sol";
import {BlockOps} from "../vm/ops/BlockOps.sol";
import {MathOps} from "../vm/ops/MathOps.sol";
import {LogicOps} from "../vm/ops/LogicOps.sol";
import {SenderOps} from "../vm/ops/SenderOps.sol";
import {TierOps} from "../vm/ops/TierOps.sol";
import {IERC20Ops} from "../vm/ops/IERC20Ops.sol";
import {IERC721Ops} from "../vm/ops/IERC721Ops.sol";
import {IERC1155Ops} from "../vm/ops/IERC1155Ops.sol";
import {VMState, StateConfig} from "../vm/libraries/VMState.sol";
import {ERC20Config} from "../erc20/ERC20Config.sol";
import "./ISale.sol";
//solhint-disable-next-line max-line-length
import {ITier, RedeemableERC20, RedeemableERC20Config} from "../redeemableERC20/RedeemableERC20.sol";
//solhint-disable-next-line max-line-length
import {RedeemableERC20Factory} from "../redeemableERC20/RedeemableERC20Factory.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
// solhint-disable-next-line max-line-length
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
// solhint-disable-next-line max-line-length
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

struct SaleConstructorConfig {
    RedeemableERC20Factory redeemableERC20Factory;
}

struct SaleConfig {
    StateConfig canStartStateConfig;
    StateConfig canEndStateConfig;
    StateConfig calculatePriceStateConfig;
    address recipient;
    IERC20 reserve;
    /// Sale can have an id to disambiguate it from other sales from the same
    /// initiator.
    uint256 cooldownDuration;
    uint256 minimumRaise;
    uint256 dustSize;
}

struct SaleRedeemableERC20Config {
    ERC20Config erc20Config;
    ITier tier;
    uint256 minimumTier;
    address distributionEndForwardingAddress;
}

struct BuyConfig {
    address feeRecipient;
    uint256 fee;
    uint256 minimumUnits;
    uint256 desiredUnits;
    uint256 maximumPrice;
}

struct Receipt {
    uint256 id;
    address feeRecipient;
    uint256 fee;
    uint256 units;
    uint256 price;
}

// solhint-disable-next-line max-states-count
contract Sale is
    Initializable,
    Cooldown,
    RainVM,
    VMState,
    ISale,
    ReentrancyGuard
{
    using Math for uint256;
    using FixedPointMath for uint256;
    using SafeERC20 for IERC20;

    event Construct(address sender, SaleConstructorConfig config);
    event Initialize(address sender, SaleConfig config, address token);
    event Start(address sender);
    event End(address sender, SaleStatus saleStatus);
    event Buy(address sender, BuyConfig config_, Receipt receipt);
    event Refund(address sender, Receipt receipt);

    uint256 private constant REMAINING_UNITS = 0;
    uint256 private constant TOTAL_RESERVE_IN = 1;

    uint256 private constant LAST_BUY_BLOCK = 2;
    uint256 private constant LAST_BUY_UNITS = 3;
    uint256 private constant LAST_BUY_PRICE = 4;

    uint256 private constant CURRENT_BUY_UNITS = 5;

    uint256 private constant TOKEN_ADDRESS = 6;
    uint256 private constant RESERVE_ADDRESS = 7;

    uint256 internal constant LOCAL_OPS_LENGTH = 8;

    uint256 private immutable blockOpsStart;
    uint256 private immutable senderOpsStart;
    uint256 private immutable logicOpsStart;
    uint256 private immutable mathOpsStart;
    uint256 private immutable tierOpsStart;
    uint256 private immutable ierc20OpsStart;
    uint256 private immutable ierc721OpsStart;
    uint256 private immutable ierc1155OpsStart;
    uint256 private immutable localOpsStart;

    RedeemableERC20Factory private immutable redeemableERC20Factory;

    // config.
    address private recipient;
    address private canStartStatePointer;
    address private canEndStatePointer;
    address private calculatePriceStatePointer;
    uint256 private minimumRaise;
    uint256 private dustSize;

    IERC20 private _reserve;
    RedeemableERC20 private _token;

    // state.
    uint256 private remainingUnits;
    uint256 private totalReserveIn;
    uint256 private lastBuyBlock;
    uint256 private lastBuyUnits;
    uint256 private lastBuyPrice;

    SaleStatus private _saleStatus;

    /// Account => keccak receipt => exists.
    mapping(address => mapping(bytes32 => bool)) private receipts;
    uint256 private nextReceiptId;

    /// Account => unclaimed fees.
    mapping(address => uint256) private fees;

    constructor(SaleConstructorConfig memory config_) {
        blockOpsStart = RainVM.OPS_LENGTH;
        senderOpsStart = blockOpsStart + BlockOps.OPS_LENGTH;
        logicOpsStart = senderOpsStart + SenderOps.OPS_LENGTH;
        mathOpsStart = logicOpsStart + LogicOps.OPS_LENGTH;
        tierOpsStart = mathOpsStart + MathOps.OPS_LENGTH;
        ierc20OpsStart = tierOpsStart + TierOps.OPS_LENGTH;
        ierc721OpsStart = ierc20OpsStart + IERC20Ops.OPS_LENGTH;
        ierc1155OpsStart = ierc721OpsStart + IERC721Ops.OPS_LENGTH;
        localOpsStart = ierc1155OpsStart + IERC1155Ops.OPS_LENGTH;

        redeemableERC20Factory = config_.redeemableERC20Factory;

        emit Construct(msg.sender, config_);
    }

    function initialize(
        SaleConfig memory config_,
        SaleRedeemableERC20Config memory saleRedeemableERC20Config_
    ) external initializer {
        initializeCooldown(config_.cooldownDuration);

        canStartStatePointer = _snapshot(
            _newState(config_.canStartStateConfig)
        );
        canEndStatePointer = _snapshot(_newState(config_.canEndStateConfig));
        calculatePriceStatePointer = _snapshot(
            _newState(config_.calculatePriceStateConfig)
        );
        recipient = config_.recipient;

        // If the raise really does have a minimum of `0` and `0` trading
        // happens then the raise will be considered a "success", burning all
        // rTKN, which would trap any escrowed or deposited funds that nobody
        // can retrieve as nobody holds any rTKN.
        // If you want `0` or very low minimum raise consider enabling rTKN
        // forwarding for unsold inventory.
        if (
            saleRedeemableERC20Config_.distributionEndForwardingAddress ==
            address(0)
        ) {
            require(config_.minimumRaise > 0, "MIN_RAISE_0");
        }
        minimumRaise = config_.minimumRaise;

        dustSize = config_.dustSize;
        // just making this explicit.
        _saleStatus = SaleStatus.Pending;

        _reserve = config_.reserve;
        saleRedeemableERC20Config_.erc20Config.distributor = address(this);
        RedeemableERC20 token_ = RedeemableERC20(
            redeemableERC20Factory.createChild(
                abi.encode(
                    RedeemableERC20Config(
                        address(config_.reserve),
                        saleRedeemableERC20Config_.erc20Config,
                        saleRedeemableERC20Config_.tier,
                        saleRedeemableERC20Config_.minimumTier,
                        saleRedeemableERC20Config_
                            .distributionEndForwardingAddress
                    )
                )
            )
        );
        _token = token_;

        remainingUnits = saleRedeemableERC20Config_.erc20Config.initialSupply;

        emit Initialize(msg.sender, config_, address(token_));
    }

    /// @inheritdoc ISale
    function token() external view returns (address) {
        return address(_token);
    }

    /// @inheritdoc ISale
    function reserve() external view returns (address) {
        return address(_reserve);
    }

    /// @inheritdoc ISale
    function saleStatus() external view returns (SaleStatus) {
        return _saleStatus;
    }

    function canStart() public view returns (bool) {
        State memory state_ = _restore(canStartStatePointer);
        eval("", state_, 0);
        return state_.stack[state_.stackIndex - 1] > 0;
    }

    function canEnd() public view returns (bool) {
        State memory state_ = _restore(canEndStatePointer);
        eval("", state_, 0);
        return state_.stack[state_.stackIndex - 1] > 0;
    }

    function start() external {
        require(_saleStatus == SaleStatus.Pending, "NOT_PENDING");
        require(canStart(), "CANT_START");
        _saleStatus = SaleStatus.Active;
        emit Start(msg.sender);
    }

    function end() public {
        require(_saleStatus == SaleStatus.Active, "NOT_ACTIVE");
        require(remainingUnits < 1 || canEnd(), "CANT_END");

        remainingUnits = 0;

        bool success_ = totalReserveIn >= minimumRaise;
        SaleStatus endStatus_ = success_ ? SaleStatus.Success : SaleStatus.Fail;
        emit End(msg.sender, endStatus_);
        _saleStatus = endStatus_;

        // Always burn the undistributed tokens.
        _token.endDistribution(address(this));

        // Only send reserve to recipient if the raise is a success.
        if (success_) {
            _reserve.safeTransfer(recipient, totalReserveIn);
        }
    }

    function calculatePrice(uint256 units_) public view returns (uint256) {
        State memory state_ = _restore(calculatePriceStatePointer);
        eval(abi.encode(units_), state_, 0);

        return state_.stack[state_.stackIndex - 1];
    }

    function buy(BuyConfig memory config_)
        external
        onlyAfterCooldown
        nonReentrant
    {
        require(config_.desiredUnits > 0, "0_DESIRED");
        require(
            config_.minimumUnits <= config_.desiredUnits,
            "MINIMUM_OVER_DESIRED"
        );

        require(_saleStatus == SaleStatus.Active, "NOT_ACTIVE");

        uint256 units_ = config_.desiredUnits.min(remainingUnits).max(
            config_.minimumUnits
        );
        require(units_ <= remainingUnits, "INSUFFICIENT_STOCK");

        uint256 price_ = calculatePrice(units_);

        require(price_ <= config_.maximumPrice, "MAXIMUM_PRICE");
        uint256 cost_ = price_.fixedPointMul(units_);

        Receipt memory receipt_ = Receipt(
            nextReceiptId,
            config_.feeRecipient,
            config_.fee,
            units_,
            price_
        );
        nextReceiptId++;
        receipts[msg.sender][keccak256(abi.encode(receipt_))] = true;

        fees[config_.feeRecipient] += config_.fee;

        remainingUnits -= units_;
        totalReserveIn += cost_;

        lastBuyBlock = block.number;
        lastBuyUnits = units_;
        lastBuyPrice = price_;

        // This happens before `end` so that the transfer out happens before
        // the last transfer in.
        // `end` does state changes so `buy` needs to be nonReentrant.
        _reserve.safeTransferFrom(
            msg.sender,
            address(this),
            cost_ + config_.fee
        );
        // This happens before `end` so that the transfer happens before the
        // distributor is burned and token is frozen.
        IERC20(address(_token)).safeTransfer(msg.sender, units_);

        if (remainingUnits < 1) {
            end();
        } else {
            require(remainingUnits >= dustSize, "DUST");
        }

        emit Buy(msg.sender, config_, receipt_);
    }

    function refundCooldown()
        private
        onlyAfterCooldown
    // solhint-disable-next-line no-empty-blocks
    {

    }

    function refund(Receipt calldata receipt_) external {
        require(_saleStatus != SaleStatus.Success, "REFUND_SUCCESS");
        bytes32 receiptKeccak_ = keccak256(abi.encode(receipt_));
        require(receipts[msg.sender][receiptKeccak_], "INVALID_RECEIPT");
        delete receipts[msg.sender][receiptKeccak_];

        uint256 cost_ = receipt_.price.fixedPointMul(receipt_.units);

        totalReserveIn -= cost_;
        remainingUnits += receipt_.units;
        fees[receipt_.feeRecipient] -= receipt_.fee;

        // Only respect/trigger cooldown if the raise is active.
        if (_saleStatus == SaleStatus.Pending) {
            refundCooldown();
        }

        emit Refund(msg.sender, receipt_);

        IERC20(address(_token)).safeTransferFrom(
            msg.sender,
            address(this),
            receipt_.units
        );
        _reserve.safeTransfer(msg.sender, cost_ + receipt_.fee);
    }

    function claimFees(address recipient_) external {
        require(_saleStatus == SaleStatus.Success, "NOT_SUCCESS");
        uint256 amount_ = fees[recipient_];
        delete fees[recipient_];
        _reserve.safeTransfer(recipient_, amount_);
    }

    function applyOp(
        bytes memory context_,
        State memory state_,
        uint256 opcode_,
        uint256 operand_
    ) internal view override {
        unchecked {
            if (opcode_ < senderOpsStart) {
                BlockOps.applyOp(
                    context_,
                    state_,
                    opcode_ - blockOpsStart,
                    operand_
                );
            } else if (opcode_ < logicOpsStart) {
                SenderOps.applyOp(
                    context_,
                    state_,
                    opcode_ - senderOpsStart,
                    operand_
                );
            } else if (opcode_ < mathOpsStart) {
                LogicOps.applyOp(
                    context_,
                    state_,
                    opcode_ - logicOpsStart,
                    operand_
                );
            } else if (opcode_ < tierOpsStart) {
                MathOps.applyOp(
                    context_,
                    state_,
                    opcode_ - mathOpsStart,
                    operand_
                );
            } else if (opcode_ < ierc20OpsStart) {
                TierOps.applyOp(
                    context_,
                    state_,
                    opcode_ - tierOpsStart,
                    operand_
                );
            } else if (opcode_ < ierc721OpsStart) {
                IERC20Ops.applyOp(
                    context_,
                    state_,
                    opcode_ - ierc20OpsStart,
                    operand_
                );
            } else if (opcode_ < ierc1155OpsStart) {
                IERC721Ops.applyOp(
                    context_,
                    state_,
                    opcode_ - ierc721OpsStart,
                    operand_
                );
            } else if (opcode_ < localOpsStart) {
                IERC1155Ops.applyOp(
                    context_,
                    state_,
                    opcode_ - ierc1155OpsStart,
                    operand_
                );
            } else {
                opcode_ -= localOpsStart;
                require(opcode_ < LOCAL_OPS_LENGTH, "MAX_OPCODE");
                if (opcode_ == REMAINING_UNITS) {
                    state_.stack[state_.stackIndex] = remainingUnits;
                } else if (opcode_ == TOTAL_RESERVE_IN) {
                    state_.stack[state_.stackIndex] = totalReserveIn;
                } else if (opcode_ == LAST_BUY_BLOCK) {
                    state_.stack[state_.stackIndex] = lastBuyBlock;
                } else if (opcode_ == LAST_BUY_UNITS) {
                    state_.stack[state_.stackIndex] = lastBuyUnits;
                } else if (opcode_ == LAST_BUY_PRICE) {
                    state_.stack[state_.stackIndex] = lastBuyPrice;
                } else if (opcode_ == CURRENT_BUY_UNITS) {
                    uint256 units_ = abi.decode(context_, (uint256));
                    state_.stack[state_.stackIndex] = units_;
                } else if (opcode_ == TOKEN_ADDRESS) {
                    state_.stack[state_.stackIndex] = uint256(
                        uint160(address(_token))
                    );
                } else if (opcode_ == RESERVE_ADDRESS) {
                    state_.stack[state_.stackIndex] = uint256(
                        uint160(address(_reserve))
                    );
                }
                state_.stackIndex++;
            }
        }
    }
}
