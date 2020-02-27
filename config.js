const BN = require("bn.js");

module.exports = {
    // for testing and deploy
    name: "StableCoin",
    symbol: "STB",
    decimals: 2,
    // for testing only
    basisPointsRate: new BN(50, 10),
    minimumFee: new BN(5 * 10 ** 2, 10),
    maximumFee: new BN(10 * 10 ** 2, 10),
    specialFee: {
        basisPointsRate: new BN(20, 10),
        minimumFee: new BN(4 * 10 ** 2, 10),
        maximumFee: new BN(8 * 10 ** 2, 10),
        isActive: true
    },
    tokenAmount: new BN(100 * 10 ** 2, 10),
    wrongTokenAmount: new BN(1, 10),
    denominator: new BN(10000, 10),
    abi: [
        {
            inputs: [
                {
                    internalType: "string",
                    name: "name",
                    type: "string"
                },
                {
                    internalType: "string",
                    name: "symbol",
                    type: "string"
                },
                {
                    internalType: "uint8",
                    name: "decimals",
                    type: "uint8"
                }
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "constructor"
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "owner",
                    type: "address"
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "spender",
                    type: "address"
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "value",
                    type: "uint256"
                }
            ],
            name: "Approval",
            type: "event"
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "account",
                    type: "address"
                }
            ],
            name: "BurnerAdded",
            type: "event"
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "account",
                    type: "address"
                }
            ],
            name: "BurnerRemoved",
            type: "event"
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "_feesCollector",
                    type: "address"
                },
                {
                    indexed: true,
                    internalType: "uint256",
                    name: "fee",
                    type: "uint256"
                }
            ],
            name: "Fee",
            type: "event"
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "_feesCollector",
                    type: "address"
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "newFeesCollector",
                    type: "address"
                }
            ],
            name: "FeesCollector",
            type: "event"
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "account",
                    type: "address"
                }
            ],
            name: "MinterAdded",
            type: "event"
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "account",
                    type: "address"
                }
            ],
            name: "MinterRemoved",
            type: "event"
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "previousOwner",
                    type: "address"
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "newOwner",
                    type: "address"
                }
            ],
            name: "OwnershipTransferred",
            type: "event"
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "uint256",
                    name: "newBasisPoints",
                    type: "uint256"
                },
                {
                    indexed: true,
                    internalType: "uint256",
                    name: "newMinFee",
                    type: "uint256"
                },
                {
                    indexed: true,
                    internalType: "uint256",
                    name: "newMaxFee",
                    type: "uint256"
                }
            ],
            name: "Params",
            type: "event"
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "account",
                    type: "address"
                },
                {
                    indexed: true,
                    internalType: "uint256",
                    name: "newBasisPoints",
                    type: "uint256"
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "newMinFee",
                    type: "uint256"
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "newMaxFee",
                    type: "uint256"
                }
            ],
            name: "SpecialParams",
            type: "event"
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "from",
                    type: "address"
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "to",
                    type: "address"
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "value",
                    type: "uint256"
                }
            ],
            name: "Transfer",
            type: "event"
        },
        {
            constant: true,
            inputs: [
                {
                    internalType: "address",
                    name: "owner",
                    type: "address"
                },
                {
                    internalType: "address",
                    name: "spender",
                    type: "address"
                }
            ],
            name: "allowance",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256"
                }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "address",
                    name: "spender",
                    type: "address"
                },
                {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256"
                }
            ],
            name: "approve",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool"
                }
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
        },
        {
            constant: true,
            inputs: [
                {
                    internalType: "address",
                    name: "account",
                    type: "address"
                }
            ],
            name: "balanceOf",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256"
                }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
        },
        {
            constant: true,
            inputs: [],
            name: "basisPointsRate",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256"
                }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "address",
                    name: "account",
                    type: "address"
                },
                {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256"
                }
            ],
            name: "calculateFee",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256"
                }
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
        },
        {
            constant: true,
            inputs: [],
            name: "decimals",
            outputs: [
                {
                    internalType: "uint8",
                    name: "",
                    type: "uint8"
                }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "address",
                    name: "spender",
                    type: "address"
                },
                {
                    internalType: "uint256",
                    name: "subtractedValue",
                    type: "uint256"
                }
            ],
            name: "decreaseAllowance",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool"
                }
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
        },
        {
            constant: true,
            inputs: [],
            name: "denominator",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256"
                }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
        },
        {
            constant: true,
            inputs: [
                {
                    internalType: "address",
                    name: "account",
                    type: "address"
                }
            ],
            name: "fees",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256"
                },
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256"
                },
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256"
                },
                {
                    internalType: "bool",
                    name: "",
                    type: "bool"
                }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
        },
        {
            constant: true,
            inputs: [],
            name: "feesCollector",
            outputs: [
                {
                    internalType: "address",
                    name: "",
                    type: "address"
                }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "address",
                    name: "spender",
                    type: "address"
                },
                {
                    internalType: "uint256",
                    name: "addedValue",
                    type: "uint256"
                }
            ],
            name: "increaseAllowance",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool"
                }
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
        },
        {
            constant: true,
            inputs: [],
            name: "isOwner",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool"
                }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
        },
        {
            constant: true,
            inputs: [],
            name: "maximumFee",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256"
                }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
        },
        {
            constant: true,
            inputs: [],
            name: "minimumFee",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256"
                }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
        },
        {
            constant: true,
            inputs: [],
            name: "name",
            outputs: [
                {
                    internalType: "string",
                    name: "",
                    type: "string"
                }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
        },
        {
            constant: true,
            inputs: [],
            name: "owner",
            outputs: [
                {
                    internalType: "address",
                    name: "",
                    type: "address"
                }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
        },
        {
            constant: false,
            inputs: [],
            name: "renounceOwnership",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "address",
                    name: "newFeesCollector",
                    type: "address"
                }
            ],
            name: "setFeesCollector",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool"
                }
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "uint256",
                    name: "newBasisPoints",
                    type: "uint256"
                },
                {
                    internalType: "uint256",
                    name: "newMinFee",
                    type: "uint256"
                },
                {
                    internalType: "uint256",
                    name: "newMaxFee",
                    type: "uint256"
                }
            ],
            name: "setParams",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool"
                }
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "address",
                    name: "account",
                    type: "address"
                },
                {
                    internalType: "uint256",
                    name: "newBasisPoints",
                    type: "uint256"
                },
                {
                    internalType: "uint256",
                    name: "newMinFee",
                    type: "uint256"
                },
                {
                    internalType: "uint256",
                    name: "newMaxFee",
                    type: "uint256"
                },
                {
                    internalType: "bool",
                    name: "state",
                    type: "bool"
                }
            ],
            name: "setSpecialParams",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool"
                }
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
        },
        {
            constant: true,
            inputs: [],
            name: "symbol",
            outputs: [
                {
                    internalType: "string",
                    name: "",
                    type: "string"
                }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
        },
        {
            constant: true,
            inputs: [],
            name: "totalSupply",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256"
                }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "address",
                    name: "recipient",
                    type: "address"
                },
                {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256"
                }
            ],
            name: "transfer",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool"
                }
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "address",
                    name: "sender",
                    type: "address"
                },
                {
                    internalType: "address",
                    name: "recipient",
                    type: "address"
                },
                {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256"
                }
            ],
            name: "transferFrom",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool"
                }
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "address",
                    name: "newOwner",
                    type: "address"
                }
            ],
            name: "transferOwnership",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "address",
                    name: "account",
                    type: "address"
                }
            ],
            name: "addMinter",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "address",
                    name: "account",
                    type: "address"
                }
            ],
            name: "addBurner",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "address",
                    name: "account",
                    type: "address"
                }
            ],
            name: "renounceMinter",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "address",
                    name: "account",
                    type: "address"
                }
            ],
            name: "renounceBurner",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
        },
        {
            constant: true,
            inputs: [
                {
                    internalType: "address",
                    name: "account",
                    type: "address"
                }
            ],
            name: "isMinter",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool"
                }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
        },
        {
            constant: true,
            inputs: [
                {
                    internalType: "address",
                    name: "account",
                    type: "address"
                }
            ],
            name: "isBurner",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool"
                }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "address",
                    name: "to",
                    type: "address"
                },
                {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256"
                }
            ],
            name: "mint",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool"
                }
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
        },
        {
            constant: false,
            inputs: [
                {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256"
                }
            ],
            name: "burn",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool"
                }
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
        }
    ],
    bytecode:
        "0x608060405234801561001057600080fd5b50600436106101fb5760003560e01c8063715018a61161011a578063a457c2d7116100ad578063dd62ed3e1161007c578063dd62ed3e14610aa6578063dd644f7214610b1e578063f2fde38b14610b3c578063f44637ba14610b80578063faaebd2114610bc4576101fb565b8063a457c2d7146108f8578063a9059cbb1461095e578063aa271e1a146109c4578063d065a29914610a20576101fb565b806395d89b41116100e957806395d89b41146107c957806396ce07951461084c578063983b2d561461086a5780639cf160f6146108ae576101fb565b8063715018a6146106f15780638b28ab1e146106fb5780638da5cb5b1461075d5780638f32d59b146107a7576101fb565b806339509351116101925780635a0ce676116101615780635a0ce676146105b75780635f112c6814610611578063660145be1461065557806370a0823114610699576101fb565b8063395093511461044957806340c10f19146104af57806342966c68146105155780634334614a1461055b576101fb565b806323b872dd116101ce57806323b872dd14610325578063313ce567146103ab57806335390714146103cf578063373071f2146103ed576101fb565b806306fdde0314610200578063095ea7b31461028357806318160ddd146102e95780631a7626e714610307575b600080fd5b610208610c35565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561024857808201518184015260208101905061022d565b50505050905090810190601f1680156102755780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102cf6004803603604081101561029957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610cd7565b604051808215151515815260200191505060405180910390f35b6102f1610cf5565b6040518082815260200191505060405180910390f35b61030f610cff565b6040518082815260200191505060405180910390f35b6103916004803603606081101561033b57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610d09565b604051808215151515815260200191505060405180910390f35b6103b3610de2565b604051808260ff1660ff16815260200191505060405180910390f35b6103d7610df9565b6040518082815260200191505060405180910390f35b61042f6004803603602081101561040357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610e03565b604051808215151515815260200191505060405180910390f35b6104956004803603604081101561045f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610fcb565b604051808215151515815260200191505060405180910390f35b6104fb600480360360408110156104c557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061107e565b604051808215151515815260200191505060405180910390f35b6105416004803603602081101561052b57600080fd5b81019080803590602001909291905050506110f9565b604051808215151515815260200191505060405180910390f35b61059d6004803603602081101561057157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611176565b604051808215151515815260200191505060405180910390f35b6105f7600480360360608110156105cd57600080fd5b81019080803590602001909291908035906020019092919080359060200190929190505050611193565b604051808215151515815260200191505060405180910390f35b6106536004803603602081101561062757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061125e565b005b6106976004803603602081101561066b57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506112e4565b005b6106db600480360360208110156106af57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061136a565b6040518082815260200191505060405180910390f35b6106f96113b3565b005b6107476004803603604081101561071157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506114ec565b6040518082815260200191505060405180910390f35b6107656115c1565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6107af6115ea565b604051808215151515815260200191505060405180910390f35b6107d1611648565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156108115780820151818401526020810190506107f6565b50505050905090810190601f16801561083e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6108546116ea565b6040518082815260200191505060405180910390f35b6108ac6004803603602081101561088057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506116f4565b005b6108b661177a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6109446004803603604081101561090e57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506117a4565b604051808215151515815260200191505060405180910390f35b6109aa6004803603604081101561097457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611871565b604051808215151515815260200191505060405180910390f35b610a06600480360360208110156109da57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061188f565b604051808215151515815260200191505060405180910390f35b610a8c600480360360a0811015610a3657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190803590602001909291908035151590602001909291905050506118ac565b604051808215151515815260200191505060405180910390f35b610b0860048036036040811015610abc57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611a3b565b6040518082815260200191505060405180910390f35b610b26611ac2565b6040518082815260200191505060405180910390f35b610b7e60048036036020811015610b5257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611acc565b005b610bc260048036036020811015610b9657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611b52565b005b610c0660048036036020811015610bda57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611bd8565b604051808581526020018481526020018381526020018215151515815260200194505050505060405180910390f35b606060018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610ccd5780601f10610ca257610100808354040283529160200191610ccd565b820191906000526020600020905b815481529060010190602001808311610cb057829003601f168201915b5050505050905090565b6000610ceb610ce4611d06565b8484611d0e565b6001905092915050565b6000600754905090565b6000600954905090565b6000610d16848484611f05565b610dd784610d22611d06565b610dd28560405180606001604052806028815260200161314c60289139600560008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000610d88611d06565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546123a59092919063ffffffff16565b611d0e565b600190509392505050565b6000600360009054906101000a900460ff16905090565b6000600a54905090565b6000610e0d6115ea565b610e7f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610f05576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603881526020018061304c6038913960400191505060405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff16600c60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167faa031270faa14f493eb7abc5f320365ba17b6cee9ff519872743406dbbc77c4460405160405180910390a381600c60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060019050919050565b6000611074610fd8611d06565b8461106f8560056000610fe9611d06565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461246590919063ffffffff16565b611d0e565b6001905092915050565b600061109061108b611d06565b61188f565b6110e5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260308152602001806130da6030913960400191505060405180910390fd5b6110ef83836124ed565b6001905092915050565b600061110b611106611d06565b611176565b611160576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260308152602001806130aa6030913960400191505060405180910390fd5b61117161116b611d06565b836126aa565b919050565b600061118c82600e61286490919063ffffffff16565b9050919050565b600061119d6115ea565b61120f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b836008819055508260098190555081600a819055508183857fd16858b87f79d06c5d7f4cdf7f0943a3b343a9eb149c10ec26e7bcaae7f19bc560405160405180910390a4600190509392505050565b6112666115ea565b6112d8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b6112e181612942565b50565b6112ec6115ea565b61135e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b6113678161299c565b50565b6000600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6113bb6115ea565b61142d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a360008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b60008060008060006114fd87611bd8565b93509350935093508015611560576000611534600b54611526878a6129f690919063ffffffff16565b612a7c90919063ffffffff16565b90508381101561154657839050611553565b82811115611552578290505b5b80955050505050506115bb565b600061158b600b5461157d6008548a6129f690919063ffffffff16565b612a7c90919063ffffffff16565b90506009548110156115a15760095490506115b2565b600a548111156115b157600a5490505b5b80955050505050505b92915050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1661162c611d06565b73ffffffffffffffffffffffffffffffffffffffff1614905090565b606060028054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156116e05780601f106116b5576101008083540402835291602001916116e0565b820191906000526020600020905b8154815290600101906020018083116116c357829003601f168201915b5050505050905090565b6000600b54905090565b6116fc6115ea565b61176e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b61177781612ac6565b50565b6000600c60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60006118676117b1611d06565b84611862856040518060600160405280602581526020016131db60259139600560006117db611d06565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546123a59092919063ffffffff16565b611d0e565b6001905092915050565b600061188561187e611d06565b8484611f05565b6001905092915050565b60006118a582600d61286490919063ffffffff16565b9050919050565b60006118b66115ea565b611928576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b611930612f66565b6040518060800160405280878152602001868152602001858152602001841515815250905080600660008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000155602082015181600101556040820151816002015560608201518160030160006101000a81548160ff021916908315150217905550905050858773ffffffffffffffffffffffffffffffffffffffff167f4911f2dd30c062d375fa4a40dff10ef4d0a8f9334fb6752076e27747f3ba2e888787604051808381526020018281526020019250505060405180910390a3600191505095945050505050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6000600854905090565b611ad46115ea565b611b46576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b611b4f81612b20565b50565b611b5a6115ea565b611bcc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b611bd581612c64565b50565b600080600080600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154600660008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154600660008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154600660008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160009054906101000a900460ff1693509350935093509193509193565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611d94576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001806131b76024913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611e1a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602281526020018061302a6022913960400191505060405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040518082815260200191505060405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611f8b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526028815260200180612fba6028913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415612011576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260268152602001806130846026913960400191505060405180910390fd5b600061201d84836114ec565b905080821015612095576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601e8152602001807f45524332304665653a20616d6f756e74206c657373207468656e20666565000081525060200191505060405180910390fd5b61210182604051806060016040528060298152602001612f9160299139600460008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546123a59092919063ffffffff16565b600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060006121598284612cbe90919063ffffffff16565b90506121ad81600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461246590919063ffffffff16565b600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a3600082111561239e576122d28260046000600c60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461246590919063ffffffff16565b60046000600c60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600c60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7bd3aa7d673767f759ebf216e7f6c12844986c661ae6e0f1d988cf7eb7394d1d60405160405180910390a35b5050505050565b6000838311158290612452576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156124175780820151818401526020810190506123fc565b50505050905090810190601f1680156124445780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060008385039050809150509392505050565b6000808284019050838110156124e3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081525060200191505060405180910390fd5b8091505092915050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415612590576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f45524332303a206d696e7420746f20746865207a65726f20616464726573730081525060200191505060405180910390fd5b6125a58160075461246590919063ffffffff16565b6007819055506125fd81600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461246590919063ffffffff16565b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415612730576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260218152602001806131966021913960400191505060405180910390fd5b61279c81604051806060016040528060228152602001612fe260229139600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546123a59092919063ffffffff16565b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506127f481600754612cbe90919063ffffffff16565b600781905550600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156128eb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806131746022913960400191505060405180910390fd5b8260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b61295681600d612d0890919063ffffffff16565b8073ffffffffffffffffffffffffffffffffffffffff167fe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb6669260405160405180910390a250565b6129b081600e612d0890919063ffffffff16565b8073ffffffffffffffffffffffffffffffffffffffff167f90eabbc0c667db2a5029ed6bc0f5fe9f356d11684a4ca9fcfaec0e53f12b9c8e60405160405180910390a250565b600080831415612a095760009050612a76565b6000828402905082848281612a1a57fe5b0414612a71576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602181526020018061312b6021913960400191505060405180910390fd5b809150505b92915050565b6000612abe83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250612dc5565b905092915050565b612ada81600d612e8b90919063ffffffff16565b8073ffffffffffffffffffffffffffffffffffffffff167f6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f660405160405180910390a250565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415612ba6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260268152602001806130046026913960400191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b612c7881600e612e8b90919063ffffffff16565b8073ffffffffffffffffffffffffffffffffffffffff167f86e57fd2b90329052917118de7c3f521f400d439b9650deaa906a25b08b9456060405160405180910390a250565b6000612d0083836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f7700008152506123a5565b905092915050565b612d128282612864565b612d67576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602181526020018061310a6021913960400191505060405180910390fd5b60008260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b60008083118290612e71576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015612e36578082015181840152602081019050612e1b565b50505050905090810190601f168015612e635780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b506000838581612e7d57fe5b049050809150509392505050565b612e958282612864565b15612f08576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f526f6c65733a206163636f756e7420616c72656164792068617320726f6c650081525060200191505060405180910390fd5b60018260000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b6040518060800160405280600081526020016000815260200160008152602001600015158152509056fe45524332304665653a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332304665653a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e63654f776e61626c653a206e6577206f776e657220697320746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737353657446656573436f6c6c6563746f723a206e6577206665657320636f6c6c6563746f7220697320746865207a65726f206164647265737345524332304665653a207472616e7366657220746f20746865207a65726f20616464726573734275726e6572526f6c653a2063616c6c657220646f6573206e6f74206861766520746865204275726e657220726f6c654d696e746572526f6c653a2063616c6c657220646f6573206e6f74206861766520746865204d696e74657220726f6c65526f6c65733a206163636f756e7420646f6573206e6f74206861766520726f6c65536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f7745524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e6365526f6c65733a206163636f756e7420697320746865207a65726f206164647265737345524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa265627a7a723158202614ebd04484a1523a658f8de430de3a3f419d5ed6c361b65572088e8de6489164736f6c63430005100032"
};
