// SPDX-License-Identifier: CAL
pragma solidity =0.8.15;

import "./LibVMState.sol";
import "./RainVM.sol";
import "./RainVMIntegrity.sol";
import "./ops/AllStandardOps.sol";

contract StandardVM is RainVM {
    using LibVMState for bytes;
    address internal immutable self;
    address internal immutable vmStateBuilder;

    /// Address of the immutable rain script deployed as a `VMState`.
    address internal vmStatePointer;

    constructor(address vmStateBuilder_) {
        self = address(this);
        vmStateBuilder = vmStateBuilder_;
    }

    function _saveVMState(
        StateConfig memory config_,
        uint256[] memory finalMinStacks_
    ) internal virtual {
        bytes memory stateBytes_ = RainVMIntegrity(vmStateBuilder)
            .buildStateBytes(self, config_, finalMinStacks_);
        vmStatePointer = SSTORE2.write(stateBytes_);
    }

    function _loadVMState(uint256[] memory context_)
        internal
        view
        virtual
        returns (VMState memory)
    {
        return SSTORE2.read(vmStatePointer).fromBytesPacked(context_);
    }

    function localFnPtrs()
        internal
        pure
        virtual
        returns (
            function(VMState memory, Operand, StackTop)
                view
                returns (StackTop)[]
                memory localFnPtrs_
        )
    {}

    /// @inheritdoc RainVM
    function packedFunctionPointers()
        public
        view
        virtual
        override
        returns (bytes memory)
    {
        return AllStandardOps.packedFunctionPointers(localFnPtrs());
    }
}
