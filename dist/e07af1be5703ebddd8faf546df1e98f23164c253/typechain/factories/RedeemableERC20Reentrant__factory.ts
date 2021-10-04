/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { RedeemableERC20Reentrant } from "../RedeemableERC20Reentrant";

export class RedeemableERC20Reentrant__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    redeemableERC20Contract_: string,
    overrides?: Overrides
  ): Promise<RedeemableERC20Reentrant> {
    return super.deploy(
      redeemableERC20Contract_,
      overrides || {}
    ) as Promise<RedeemableERC20Reentrant>;
  }
  getDeployTransaction(
    redeemableERC20Contract_: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      redeemableERC20Contract_,
      overrides || {}
    );
  }
  attach(address: string): RedeemableERC20Reentrant {
    return super.attach(address) as RedeemableERC20Reentrant;
  }
  connect(signer: Signer): RedeemableERC20Reentrant__factory {
    return super.connect(signer) as RedeemableERC20Reentrant__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RedeemableERC20Reentrant {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as RedeemableERC20Reentrant;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "contract RedeemableERC20",
        name: "redeemableERC20Contract_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DECIMALS",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TOTAL_SUPPLY",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
    ],
    name: "addFreezable",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "freezables",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620016c3380380620016c3833981810160405260208110156200003757600080fd5b5051604080518082018252600b81526a55534420436c617373696360a81b602082810191825283518085019094526005845264555344434360d81b908401528151919291620000899160039162000426565b5080516200009f90600490602084019062000426565b50506005805460ff1916601217905550620000bb6006620000f4565b620000ce3366038d7ea4c680006200010a565b600780546001600160a01b0319166001600160a01b0392909216919091179055620004c2565b6005805460ff191660ff92909216919091179055565b6001600160a01b03821662000166576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b620001746000838362000219565b62000190816002546200035460201b6200087a1790919060201c565b6002556001600160a01b03821660009081526020818152604090912054620001c39183906200087a62000354821b17901c565b6001600160a01b0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b62000231838383620003b660201b620008f51760201c565b6001600160a01b038316158015906200025757506007546001600160a01b038481169116145b156200034f576040805160018082528183019092526060916020808301908036833701905050905030816000815181106200028e57fe5b6001600160a01b03928316602091820292909201810191909152600754604080516362e4bf6760e11b81526024810187905260048101918252855160448201528551929094169363c5c97ece9386938893928392606490910191868201910280838360005b838110156200030d578181015183820152602001620002f3565b505050509050019350505050600060405180830381600087803b1580156200033457600080fd5b505af115801562000349573d6000803e3d6000fd5b50505050505b505050565b600082820183811015620003af576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b620003ce8383836200034f60201b6200072a1760201c565b6001600160a01b03821660009081526006602052604090205460ff16156200034f576040805162461bcd60e51b8152602060048201526006602482015265232927ad22a760d11b604482015290519081900360640190fd5b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200046957805160ff191683800117855562000499565b8280016001018555821562000499579182015b82811115620004995782518255916020019190600101906200047c565b50620004a7929150620004ab565b5090565b5b80821115620004a75760008155600101620004ac565b6111f180620004d26000396000f3fe608060405234801561001057600080fd5b506004361061011b5760003560e01c806348422faa116100b2578063902d55a511610081578063a457c2d711610066578063a457c2d7146103a7578063a9059cbb146103e0578063dd62ed3e146104195761011b565b8063902d55a51461039757806395d89b411461039f5761011b565b806348422faa146102c55780635bb9058b146102f857806370a082311461032b57806379cc67901461035e5761011b565b80632e0f2625116100ee5780632e0f262514610247578063313ce56714610265578063395093511461026d57806342966c68146102a65761011b565b806306fdde0314610120578063095ea7b31461019d57806318160ddd146101ea57806323b872dd14610204575b600080fd5b610128610454565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561016257818101518382015260200161014a565b50505050905090810190601f16801561018f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101d6600480360360408110156101b357600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135610508565b604080519115158252519081900360200190f35b6101f2610525565b60408051918252519081900360200190f35b6101d66004803603606081101561021a57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81358116916020810135909116906040013561052b565b61024f6105cc565b6040805160ff9092168252519081900360200190f35b61024f6105d1565b6101d66004803603604081101561028357600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81351690602001356105da565b6102c3600480360360208110156102bc57600080fd5b5035610635565b005b6101d6600480360360208110156102db57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610649565b6102c36004803603602081101561030e57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661065e565b6101f26004803603602081101561034157600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166106ad565b6102c36004803603604081101561037457600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81351690602001356106d5565b6101f261072f565b61012861073a565b6101d6600480360360408110156103bd57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81351690602001356107b9565b6101d6600480360360408110156103f657600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813516906020013561082e565b6101f26004803603604081101561042f57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81358116916020013516610842565b60038054604080516020601f60027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104fe5780601f106104d3576101008083540402835291602001916104fe565b820191906000526020600020905b8154815290600101906020018083116104e157829003601f168201915b5050505050905090565b600061051c610515610995565b8484610999565b50600192915050565b60025490565b6000610538848484610ae0565b6105c284610544610995565b6105bd856040518060600160405280602881526020016110e16028913973ffffffffffffffffffffffffffffffffffffffff8a1660009081526001602052604081209061058f610995565b73ffffffffffffffffffffffffffffffffffffffff1681526020810191909152604001600020549190610cb0565b610999565b5060019392505050565b600681565b60055460ff1690565b600061051c6105e7610995565b846105bd85600160006105f8610995565b73ffffffffffffffffffffffffffffffffffffffff908116825260208083019390935260409182016000908120918c16815292529020549061087a565b610646610640610995565b82610d61565b50565b60066020526000908152604090205460ff1681565b73ffffffffffffffffffffffffffffffffffffffff16600090815260066020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055565b73ffffffffffffffffffffffffffffffffffffffff1660009081526020819052604090205490565b600061070c826040518060600160405280602481526020016111096024913961070586610700610995565b610842565b9190610cb0565b90506107208361071a610995565b83610999565b61072a8383610d61565b505050565b66038d7ea4c6800081565b60048054604080516020601f60027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104fe5780601f106104d3576101008083540402835291602001916104fe565b600061051c6107c6610995565b846105bd8560405180606001604052806025815260200161119760259139600160006107f0610995565b73ffffffffffffffffffffffffffffffffffffffff908116825260208083019390935260409182016000908120918d16815292529020549190610cb0565b600061051c61083b610995565b8484610ae0565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260016020908152604080832093909416825291909152205490565b6000828201838110156108ee57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b61090083838361072a565b73ffffffffffffffffffffffffffffffffffffffff821660009081526006602052604090205460ff161561072a57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600660248201527f46524f5a454e0000000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b3390565b73ffffffffffffffffffffffffffffffffffffffff8316610a05576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001806111736024913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8216610a71576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806110996022913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b73ffffffffffffffffffffffffffffffffffffffff8316610b4c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602581526020018061114e6025913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8216610bb8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001806110546023913960400191505060405180910390fd5b610bc3838383610eab565b610c0d816040518060600160405280602681526020016110bb6026913973ffffffffffffffffffffffffffffffffffffffff86166000908152602081905260409020549190610cb0565b73ffffffffffffffffffffffffffffffffffffffff8085166000908152602081905260408082209390935590841681522054610c49908261087a565b73ffffffffffffffffffffffffffffffffffffffff8084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b60008184841115610d59576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610d1e578181015183820152602001610d06565b50505050905090810190601f168015610d4b5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b73ffffffffffffffffffffffffffffffffffffffff8216610dcd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602181526020018061112d6021913960400191505060405180910390fd5b610dd982600083610eab565b610e23816040518060600160405280602281526020016110776022913973ffffffffffffffffffffffffffffffffffffffff85166000908152602081905260409020549190610cb0565b73ffffffffffffffffffffffffffffffffffffffff8316600090815260208190526040902055600254610e569082611011565b60025560408051828152905160009173ffffffffffffffffffffffffffffffffffffffff8516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b610eb68383836108f5565b73ffffffffffffffffffffffffffffffffffffffff831615801590610ef5575060075473ffffffffffffffffffffffffffffffffffffffff8481169116145b1561072a57604080516001808252818301909252606091602080830190803683370190505090503081600081518110610f2a57fe5b73ffffffffffffffffffffffffffffffffffffffff928316602091820292909201810191909152600754604080517fc5c97ece0000000000000000000000000000000000000000000000000000000081526024810187905260048101918252855160448201528551929094169363c5c97ece9386938893928392606490910191868201910280838360005b83811015610fcd578181015183820152602001610fb5565b505050509050019350505050600060405180830381600087803b158015610ff357600080fd5b505af1158015611007573d6000803e3d6000fd5b5050505050505050565b60006108ee83836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250610cb056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e636545524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a206275726e20616d6f756e74206578636565647320616c6c6f77616e636545524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa264697066735822122031a1c90a981559bd2ebe5381c2ff9e339e01eec4603055424afdddb693578ed264736f6c634300060c0033";
