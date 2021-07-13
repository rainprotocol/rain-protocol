// SPDX-License-Identifier: MIT

pragma solidity ^0.6.12;

import { Phase, Phased } from "../Phased.sol";

/// @title PhasedTest
/// Empty contract for tests enumerating behaviour of the modifiers.
contract PhasedTest is Phased {
    /// Custom variable for testing _beforeScheduleNextPhase hook
    bool public hookCondition = true;

    /// Exposes `scheduleNextPhase` for testing.
    /// @param nextPhaseBlock_ As per `scheduleNestPhase`.
    function testScheduleNextPhase(uint32 nextPhaseBlock_) external {
        scheduleNextPhase(nextPhaseBlock_);
    }

    /// This function wraps `onlyPhase` modifier, passing phase directly into modifier argument.
    /// @param phase_ Modifier MUST error if current phase is not `phase_`.
    /// @return Always true if not error.
    function runsOnlyPhase(Phase phase_) external view onlyPhase(phase_) returns(bool)
    {
        return true;
    }

    /// This function wraps `onlyAtLeastPhase` modifier, passing phase directly into modifier argument.
    /// @param phase_ Modifier MUST error if current phase is not AT LEAST `phase_`.
    /// @return Always true if not error.
    function runsOnlyAtLeastPhase(Phase phase_) external view onlyAtLeastPhase(phase_) returns(bool)
    {
        return true;
    }

    /// Toggles `hookCondition` for testing phase scheduling hook.
    function toggleHookCondition() external {
        hookCondition = !hookCondition;
    }

    /// @inheritdoc Phased
    function _beforeScheduleNextPhase(uint32 nextPhaseBlock_) internal virtual override {
        require(hookCondition, "HOOK_CONDITION");
        super._beforeScheduleNextPhase(nextPhaseBlock_);
    }
}