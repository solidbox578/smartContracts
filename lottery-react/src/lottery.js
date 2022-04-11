import web3 from './web3';

const address='0x4618792601990b6e5FA9E1A4ae4e61259A141DC3';

const abi =
[
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
    constant: undefined,
    payable: undefined,
    signature: 'constructor'
  },
  {
    inputs: [],
    name: 'enter',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    constant: undefined,
    payable: true,
    signature: '0xe97dcb62'
  },
  {
    inputs: [],
    name: 'getPlayersList',
    outputs: [
      {
        internalType: 'address payable[]',
        name: '',
        type: 'address[]'
      }
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x29c983ec'
  },
  {
    inputs: [],
    name: 'manager',
    outputs: [ { internalType: 'address', name: '', type: 'address' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x481c6a75'
  },
  {
    inputs: [],
    name: 'pickWinner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    constant: undefined,
    payable: undefined,
    signature: '0x5d495aea'
  },
  {
    inputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    name: 'players',
    outputs: [ { internalType: 'address payable', name: '', type: 'address' } ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0xf71d96cb'
  }
];


export default new web3.eth.Contract(abi, address);
