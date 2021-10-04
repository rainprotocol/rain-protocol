/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { SeedERC20Reentrant } from "../SeedERC20Reentrant";

export class SeedERC20Reentrant__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<SeedERC20Reentrant> {
    return super.deploy(overrides || {}) as Promise<SeedERC20Reentrant>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): SeedERC20Reentrant {
    return super.attach(address) as SeedERC20Reentrant;
  }
  connect(signer: Signer): SeedERC20Reentrant__factory {
    return super.connect(signer) as SeedERC20Reentrant__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SeedERC20Reentrant {
    return new Contract(address, _abi, signerOrProvider) as SeedERC20Reentrant;
  }
}

const _abi = [
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
        internalType: "contract SeedERC20",
        name: "seedERC20Contract_",
        type: "address",
      },
    ],
    name: "addReentrantTarget",
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
    name: "methodTarget",
    outputs: [
      {
        internalType: "enum SeedERC20Reentrant.Method",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
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
    inputs: [
      {
        internalType: "enum SeedERC20Reentrant.Method",
        name: "methodTarget_",
        type: "uint8",
      },
    ],
    name: "setMethodTarget",
    outputs: [],
    stateMutability: "nonpayable",
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
  "0x60806040523480156200001157600080fd5b50604080518082018252600b81526a55534420436c617373696360a81b602080830191825283518085019094526005845264555344434360d81b90840152815191929162000062916003916200049e565b508051620000789060049060208401906200049e565b50506005805460ff1916601217905550620000946006620000ad565b620000a73366038d7ea4c68000620000c3565b6200053a565b6005805460ff191660ff92909216919091179055565b6001600160a01b0382166200011f576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b6200012d60008383620001d2565b6200014981600254620003cc60201b62000a021790919060201c565b6002556001600160a01b038216600090815260208181526040909120546200017c91839062000a02620003cc821b17901c565b6001600160a01b0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b620001ea8383836200042e60201b62000a7d1760201c565b6001600754600160a01b900460ff1660038111156200020557fe5b1480156200022057506007546001600160a01b038381169116145b1562000299576007546040805163059a803960e21b81526000600482018190526001602483015291516001600160a01b039093169263166a00e49260448084019391929182900301818387803b1580156200027a57600080fd5b505af11580156200028f573d6000803e3d6000fd5b50505050620003c7565b6002600754600160a01b900460ff166003811115620002b457fe5b148015620002cf57506007546001600160a01b038481169116145b156200032357600754604080516304a4484b60e11b81526001600482015290516001600160a01b039092169163094890969160248082019260009290919082900301818387803b1580156200027a57600080fd5b6003600754600160a01b900460ff1660038111156200033e57fe5b1480156200035957506007546001600160a01b038481169116145b15620003c7576007546040805163db006a7560e01b81526001600482015290516001600160a01b039092169163db006a759160248082019260009290919082900301818387803b158015620003ad57600080fd5b505af1158015620003c2573d6000803e3d6000fd5b505050505b505050565b60008282018381101562000427576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b62000446838383620003c760201b6200083e1760201c565b6001600160a01b03821660009081526006602052604090205460ff1615620003c7576040805162461bcd60e51b8152602060048201526006602482015265232927ad22a760d11b604482015290519081900360640190fd5b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620004e157805160ff191683800117855562000511565b8280016001018555821562000511579182015b8281111562000511578251825591602001919060010190620004f4565b506200051f92915062000523565b5090565b5b808211156200051f576000815560010162000524565b6114bc806200054a6000396000f3fe608060405234801561001057600080fd5b506004361061016c5760003560e01c80635bb9058b116100cd578063902d55a511610081578063a457c2d711610066578063a457c2d714610474578063a9059cbb146104ad578063dd62ed3e146104e65761016c565b8063902d55a51461046457806395d89b411461046c5761016c565b806379cc6790116100b257806379cc6790146103e25780637cc4129a1461041b57806385b75f5f146104445761016c565b80635bb9058b1461037c57806370a08231146103af5761016c565b8063313ce5671161012457806342966c681161010957806342966c68146102f757806348422faa1461031657806348ea30da146103495761016c565b8063313ce567146102b657806339509351146102be5761016c565b806318160ddd1161015557806318160ddd1461023b57806323b872dd146102555780632e0f2625146102985761016c565b806306fdde0314610171578063095ea7b3146101ee575b600080fd5b610179610521565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101b357818101518382015260200161019b565b50505050905090810190601f1680156101e05780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102276004803603604081101561020457600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81351690602001356105d5565b604080519115158252519081900360200190f35b6102436105f2565b60408051918252519081900360200190f35b6102276004803603606081101561026b57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135811691602081013590911690604001356105f8565b6102a0610699565b6040805160ff9092168252519081900360200190f35b6102a061069e565b610227600480360360408110156102d457600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81351690602001356106a7565b6103146004803603602081101561030d57600080fd5b5035610702565b005b6102276004803603602081101561032c57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610716565b6103146004803603602081101561035f57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661072b565b6103146004803603602081101561039257600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610772565b610243600480360360208110156103c557600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166107c1565b610314600480360360408110156103f857600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81351690602001356107e9565b610423610843565b6040518082600381111561043357fe5b815260200191505060405180910390f35b6103146004803603602081101561045a57600080fd5b503560ff16610864565b6102436108b7565b6101796108c2565b6102276004803603604081101561048a57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135610941565b610227600480360360408110156104c357600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81351690602001356109b6565b610243600480360360408110156104fc57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160200135166109ca565b60038054604080516020601f60027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156105cb5780601f106105a0576101008083540402835291602001916105cb565b820191906000526020600020905b8154815290600101906020018083116105ae57829003601f168201915b5050505050905090565b60006105e96105e2610b1d565b8484610b21565b50600192915050565b60025490565b6000610605848484610c68565b61068f84610611610b1d565b61068a856040518060600160405280602881526020016113ac6028913973ffffffffffffffffffffffffffffffffffffffff8a1660009081526001602052604081209061065c610b1d565b73ffffffffffffffffffffffffffffffffffffffff1681526020810191909152604001600020549190610e38565b610b21565b5060019392505050565b600681565b60055460ff1690565b60006105e96106b4610b1d565b8461068a85600160006106c5610b1d565b73ffffffffffffffffffffffffffffffffffffffff908116825260208083019390935260409182016000908120918c168152925290205490610a02565b61071361070d610b1d565b82610ee9565b50565b60066020526000908152604090205460ff1681565b600780547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b73ffffffffffffffffffffffffffffffffffffffff16600090815260066020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055565b73ffffffffffffffffffffffffffffffffffffffff1660009081526020819052604090205490565b6000610820826040518060600160405280602481526020016113d46024913961081986610814610b1d565b6109ca565b9190610e38565b90506108348361082e610b1d565b83610b21565b61083e8383610ee9565b505050565b60075474010000000000000000000000000000000000000000900460ff1681565b600780548291907fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff16740100000000000000000000000000000000000000008360038111156108af57fe5b021790555050565b66038d7ea4c6800081565b60048054604080516020601f60027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156105cb5780601f106105a0576101008083540402835291602001916105cb565b60006105e961094e610b1d565b8461068a856040518060600160405280602581526020016114626025913960016000610978610b1d565b73ffffffffffffffffffffffffffffffffffffffff908116825260208083019390935260409182016000908120918d16815292529020549190610e38565b60006105e96109c3610b1d565b8484610c68565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260016020908152604080832093909416825291909152205490565b600082820183811015610a7657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b610a8883838361083e565b73ffffffffffffffffffffffffffffffffffffffff821660009081526006602052604090205460ff161561083e57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600660248201527f46524f5a454e0000000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b3390565b73ffffffffffffffffffffffffffffffffffffffff8316610b8d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602481526020018061143e6024913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8216610bf9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806113646022913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b73ffffffffffffffffffffffffffffffffffffffff8316610cd4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260258152602001806114196025913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8216610d40576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602381526020018061131f6023913960400191505060405180910390fd5b610d4b838383611033565b610d95816040518060600160405280602681526020016113866026913973ffffffffffffffffffffffffffffffffffffffff86166000908152602081905260409020549190610e38565b73ffffffffffffffffffffffffffffffffffffffff8085166000908152602081905260408082209390935590841681522054610dd19082610a02565b73ffffffffffffffffffffffffffffffffffffffff8084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b60008184841115610ee1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610ea6578181015183820152602001610e8e565b50505050905090810190601f168015610ed35780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b73ffffffffffffffffffffffffffffffffffffffff8216610f55576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260218152602001806113f86021913960400191505060405180910390fd5b610f6182600083611033565b610fab816040518060600160405280602281526020016113426022913973ffffffffffffffffffffffffffffffffffffffff85166000908152602081905260409020549190610e38565b73ffffffffffffffffffffffffffffffffffffffff8316600090815260208190526040902055600254610fde90826112dc565b60025560408051828152905160009173ffffffffffffffffffffffffffffffffffffffff8516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b61103e838383610a7d565b600160075474010000000000000000000000000000000000000000900460ff16600381111561106957fe5b148015611090575060075473ffffffffffffffffffffffffffffffffffffffff8381169116145b1561112b57600754604080517f166a00e400000000000000000000000000000000000000000000000000000000815260006004820181905260016024830152915173ffffffffffffffffffffffffffffffffffffffff9093169263166a00e49260448084019391929182900301818387803b15801561110e57600080fd5b505af1158015611122573d6000803e3d6000fd5b5050505061083e565b600260075474010000000000000000000000000000000000000000900460ff16600381111561115657fe5b14801561117d575060075473ffffffffffffffffffffffffffffffffffffffff8481169116145b156111f557600754604080517f0948909600000000000000000000000000000000000000000000000000000000815260016004820152905173ffffffffffffffffffffffffffffffffffffffff9092169163094890969160248082019260009290919082900301818387803b15801561110e57600080fd5b600360075474010000000000000000000000000000000000000000900460ff16600381111561122057fe5b148015611247575060075473ffffffffffffffffffffffffffffffffffffffff8481169116145b1561083e57600754604080517fdb006a7500000000000000000000000000000000000000000000000000000000815260016004820152905173ffffffffffffffffffffffffffffffffffffffff9092169163db006a759160248082019260009290919082900301818387803b1580156112bf57600080fd5b505af11580156112d3573d6000803e3d6000fd5b50505050505050565b6000610a7683836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250610e3856fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e636545524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a206275726e20616d6f756e74206578636565647320616c6c6f77616e636545524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa2646970667358221220cad01f37c18140920588fc46a029771540299b19668de621b34d84a04a994e2964736f6c634300060c0033";
