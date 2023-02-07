// SPDX-License-Identifier: CAL
pragma solidity =0.8.17;

import {TierwiseCombine} from "./libraries/TierwiseCombine.sol";
import {ITierV2} from "./ITierV2.sol";
import {TierV2} from "./TierV2.sol";
import "../interpreter/deploy/IExpressionDeployerV1.sol";
import "../interpreter/run/LibEncodedDispatch.sol";
import "../interpreter/run/LibStackPointer.sol";
import "../interpreter/run/LibInterpreterState.sol";
import "../interpreter/caller/LibContext.sol";
import "../interpreter/caller/IInterpreterCallerV1.sol";
import "../interpreter/run/LibEvaluable.sol";
import "../interpreter/caller/LibCallerMeta.sol";

import {ERC165CheckerUpgradeable as ERC165Checker} from "@openzeppelin/contracts-upgradeable/utils/introspection/ERC165CheckerUpgradeable.sol";

bytes32 constant CALLER_META_HASH = bytes32(0x5281a1ecd46ea18005d52780b1d6c17311ecdb6136c83392b96fe4621d57d86e);

SourceIndex constant REPORT_ENTRYPOINT = SourceIndex.wrap(0);
SourceIndex constant REPORT_FOR_TIER_ENTRYPOINT = SourceIndex.wrap(1);

uint256 constant REPORT_MIN_OUTPUTS = 1;
uint256 constant REPORT_MAX_OUTPUTS = 1;

uint256 constant REPORT_FOR_TIER_MIN_OUTPUTS = 1;
uint256 constant REPORT_FOR_TIER_MAX_OUTPUTS = 1;

/// All config used during initialization of a CombineTier.
/// @param combinedTiersLength The first N values in the constants array of the
/// expressionConfig MUST be all the combined tiers that are known statically. Of
/// course some tier addresses MAY only be known at runtime and so these cannot
/// be included. For those that are included there will be additional deploy
/// time checks to ensure compatibility with each other (i.e. reportUnits).
/// @param expressionConfig Source to run for both report and reportForTier as
/// sources 0 and 1 respectively.
struct CombineTierConfig {
    uint256 combinedTiersLength;
    EvaluableConfig evaluableConfig;
}

/// @title CombineTier
/// @notice Allows combining the reports from any `ITierV2` contracts.
/// The value at the top of the stack after executing the Rain expression will be
/// used as the return of all `ITierV2` functions exposed by `CombineTier`.
contract CombineTier is TierV2, IInterpreterCallerV1 {
    using LibStackPointer for StackPointer;
    using LibStackPointer for uint256[];
    using LibUint256Array for uint256;
    using LibUint256Array for uint256[];
    using LibInterpreterState for InterpreterState;

    event Initialize(address sender, CombineTierConfig config);

    Evaluable internal evaluable;

    constructor(bytes memory callerMeta_) {
        _disableInitializers();

        LibCallerMeta.checkCallerMeta(CALLER_META_HASH, callerMeta_);
        emit InterpreterCallerMeta(msg.sender, callerMeta_);
    }

    function initialize(
        CombineTierConfig calldata config_
    ) external initializer {
        __TierV2_init();

        // Integrity check for all known combined tiers.
        for (uint256 i_ = 0; i_ < config_.combinedTiersLength; i_++) {
            require(
                ERC165Checker.supportsInterface(
                    address(
                        uint160(
                            config_.evaluableConfig.expressionConfig.constants[
                                i_
                            ]
                        )
                    ),
                    type(ITierV2).interfaceId
                ),
                "ERC165_TIERV2"
            );
        }

        emit Initialize(msg.sender, config_);

        evaluable = Evaluable(
            config_.evaluableConfig.interpreter,
            config_.evaluableConfig.store,
            config_.evaluableConfig.deployer.deployExpression(
                config_.evaluableConfig.expressionConfig,
                LibUint256Array.arrayFrom(
                    REPORT_MIN_OUTPUTS,
                    REPORT_FOR_TIER_MIN_OUTPUTS
                )
            )
        );
    }

    /// @inheritdoc ITierV2
    function report(
        address account_,
        uint256[] memory callerContext_
    ) external view virtual override returns (uint256) {
        unchecked {
            Evaluable memory evaluable_ = evaluable;
            (uint256[] memory stack_, ) = evaluable_.interpreter.eval(
                evaluable_.store,
                DEFAULT_STATE_NAMESPACE,
                LibEncodedDispatch.encode(
                    evaluable_.expression,
                    REPORT_ENTRYPOINT,
                    REPORT_MAX_OUTPUTS
                ),
                LibContext.build(
                    uint256(uint160(account_)).arrayFrom().matrixFrom(),
                    callerContext_,
                    new SignedContext[](0)
                )
            );
            return stack_[stack_.length - 1];
        }
    }

    /// @inheritdoc ITierV2
    function reportTimeForTier(
        address account_,
        uint256 tier_,
        uint256[] memory callerContext_
    ) external view returns (uint256) {
        unchecked {
            Evaluable memory evaluable_ = evaluable;
            (uint256[] memory stack_, ) = evaluable_.interpreter.eval(
                evaluable_.store,
                DEFAULT_STATE_NAMESPACE,
                LibEncodedDispatch.encode(
                    evaluable_.expression,
                    REPORT_FOR_TIER_ENTRYPOINT,
                    REPORT_FOR_TIER_MAX_OUTPUTS
                ),
                LibContext.build(
                    LibUint256Array
                        .arrayFrom(uint256(uint160(account_)), tier_)
                        .matrixFrom(),
                    callerContext_,
                    new SignedContext[](0)
                )
            );
            return stack_[stack_.length - 1];
        }
    }
}
