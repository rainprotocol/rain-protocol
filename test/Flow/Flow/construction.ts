import { assert } from "chai";
import { concat } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { FlowFactory, FlowIntegrity } from "../../../typechain";
import {
  FlowConfigStruct,
  InitializeEvent,
} from "../../../typechain/contracts/flow/raw/Flow";
import { flowDeploy } from "../../../utils/deploy/flow/flow";
import { getEventArgs } from "../../../utils/events";
import { AllStandardOps } from "../../../utils/rainvm/ops/allStandardOps";
import { memoryOperand, MemoryType, op } from "../../../utils/rainvm/vm";
import { compareStructs } from "../../../utils/test/compareStructs";

const Opcode = AllStandardOps;

describe("Flow construction tests", async function () {
  let integrity: FlowIntegrity;
  let flowFactory: FlowFactory;

  before(async () => {
    const integrityFactory = await ethers.getContractFactory("FlowIntegrity");
    integrity = (await integrityFactory.deploy()) as FlowIntegrity;
    await integrity.deployed();

    const flowFactoryFactory = await ethers.getContractFactory(
      "FlowFactory",
      {}
    );
    flowFactory = (await flowFactoryFactory.deploy(
      integrity.address
    )) as FlowFactory;
    await flowFactory.deployed();
  });

  it("should initialize on the good path", async () => {
    const signers = await ethers.getSigners();
    const deployer = signers[0];
    const alice = signers[1];

    const constants = [1, 2, alice.address];

    // prettier-ignore
    const sourceCanFlow = concat([
      op(Opcode.STATE, memoryOperand(MemoryType.Constant, 0)),
    ]);

    // prettier-ignore
    const sourceFlowIO = concat([
      op(Opcode.STATE, memoryOperand(MemoryType.Constant, 1)), // ERC1155 SKIP
      op(Opcode.STATE, memoryOperand(MemoryType.Constant, 1)), // ERC721 SKIP
      op(Opcode.STATE, memoryOperand(MemoryType.Constant, 1)), // ERC20 SKIP

      op(Opcode.STATE, memoryOperand(MemoryType.Constant, 1)), // NATIVE END

      op(Opcode.THIS_ADDRESS), // from
      op(Opcode.STATE, memoryOperand(MemoryType.Constant, 1)), // to
      op(Opcode.STATE, memoryOperand(MemoryType.Constant, 1)), // inputNative amount

      op(Opcode.STATE, memoryOperand(MemoryType.Constant, 1)), // from
      op(Opcode.THIS_ADDRESS), // to
      op(Opcode.STATE, memoryOperand(MemoryType.Constant, 1)), // inputNative amount
    ]);

    const sources = [];

    const flowConfigStruct: FlowConfigStruct = {
      stateConfig: { sources, constants },
      flows: [{ sources: [sourceCanFlow, sourceFlowIO], constants }],
    };

    const flow = await flowDeploy(deployer, flowFactory, flowConfigStruct);

    const { sender, config } = (await getEventArgs(
      flow.deployTransaction,
      "Initialize",
      flow
    )) as InitializeEvent["args"];

    assert(sender === flowFactory.address, "wrong sender in Initialize event");

    compareStructs(config, flowConfigStruct);
    console.log(flowConfigStruct);
  });
});
