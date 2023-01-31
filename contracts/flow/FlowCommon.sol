// SPDX-License-Identifier: CAL
pragma solidity =0.8.17;

import "./libraries/LibFlow.sol";
import "../interpreter/deploy/IExpressionDeployerV1.sol";
import "../interpreter/run/IInterpreterV1.sol";
import "../interpreter/run/LibEncodedDispatch.sol";
import "../interpreter/run/LibContext.sol";
import "../interpreter/run/LibInterpreterState.sol";
import "../interpreter/run/IInterpreterCallerV1.sol";
import "../interpreter/run/LibEvaluable.sol";

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {MulticallUpgradeable as Multicall} from "@openzeppelin/contracts-upgradeable/utils/MulticallUpgradeable.sol";
import {ERC721HolderUpgradeable as ERC721Holder} from "@openzeppelin/contracts-upgradeable/token/ERC721/utils/ERC721HolderUpgradeable.sol";
import {ERC1155HolderUpgradeable as ERC1155Holder} from "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155HolderUpgradeable.sol";

/// Thrown when the flow being evaluated is unregistered.
/// @param unregisteredHash Hash of the unregistered flow.
error UnregisteredFlow(bytes32 unregisteredHash);

uint256 constant FLAG_COLUMN_FLOW_ID = 0;
uint256 constant FLAG_ROW_FLOW_ID = 0;
uint256 constant FLAG_COLUMN_FLOW_TIME = 0;
uint256 constant FLAG_ROW_FLOW_TIME = 2;

uint256 constant MIN_FLOW_SENTINELS = 4;

SourceIndex constant FLOW_ENTRYPOINT = SourceIndex.wrap(0);
uint256 constant FLOW_MAX_OUTPUTS = type(uint16).max;

contract FlowCommon is
    ERC721Holder,
    ERC1155Holder,
    Multicall,
    IInterpreterCallerV1
{
    using LibInterpreterState for InterpreterState;
    using LibStackPointer for StackPointer;
    using LibStackPointer for uint256[];
    using LibUint256Array for uint256;
    using LibUint256Array for uint256[];
    using LibEvaluable for Evaluable;

    /// Evaluable hash => is registered
    mapping(bytes32 => uint256) internal _flows;

    event FlowInitialized(address sender, Evaluable evaluable);

    constructor() {
        _disableInitializers();
    }

    // solhint-disable-next-line func-name-mixedcase
    function __FlowCommon_init(
        EvaluableConfig[] memory evaluableConfigs_,
        uint256 flowMinOutputs_
    ) internal onlyInitializing {
        __ERC721Holder_init();
        __ERC1155Holder_init();
        __Multicall_init();
        require(flowMinOutputs_ >= MIN_FLOW_SENTINELS, "BAD MIN STACKS LENGTH");
        for (uint256 i_ = 0; i_ < evaluableConfigs_.length; i_++) {
            address expression_ = evaluableConfigs_[i_]
                .deployer
                .deployExpression(
                    evaluableConfigs_[i_].expressionConfig,
                    LibUint256Array.arrayFrom(flowMinOutputs_)
                );
            Evaluable memory evaluable_ = Evaluable(
                evaluableConfigs_[i_].interpreter,
                evaluableConfigs_[i_].store,
                expression_
            );
            _flows[evaluable_.hash()] = 1;
            emit FlowInitialized(msg.sender, evaluable_);
        }
    }

    function _flowDispatch(
        address expression_
    ) internal pure returns (EncodedDispatch) {
        return
            LibEncodedDispatch.encode(
                expression_,
                FLOW_ENTRYPOINT,
                FLOW_MAX_OUTPUTS
            );
    }

    modifier onlyRegisteredEvaluable(Evaluable memory evaluable_) {
        bytes32 hash_ = evaluable_.hash();
        if (_flows[hash_] == 0) {
            revert UnregisteredFlow(hash_);
        }
        _;
    }

    function flowStack(
        Evaluable memory evaluable_,
        uint256[][] memory context_
    )
        internal
        view
        onlyRegisteredEvaluable(evaluable_)
        returns (StackPointer, StackPointer, uint256[] memory)
    {
        (uint256[] memory stack_, uint256[] memory kvs_) = evaluable_
            .interpreter
            .eval(
                evaluable_.store,
                DEFAULT_STATE_NAMESPACE,
                _flowDispatch(evaluable_.expression),
                context_
            );
        return (stack_.asStackPointerUp(), stack_.asStackPointerAfter(), kvs_);
    }

    receive() external payable virtual {}
}
