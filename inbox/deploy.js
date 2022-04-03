const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('Web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
  'bring guard river sauce bunker concert fork wedding spatial lonely choose exist',
  'https://rinkeby.infura.io/v3/e7d32b84431046319dd7959d1c9f1c35'
);

const web3 = new Web3(provider);

const deploy = async () =>{
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from the account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
              .deploy({data : bytecode, arguments : ['Hi There!']})
              .send({gas : '1000000', from : accounts[0]});

  console.log('Contract deployed to address', result.options.address);
  provider.engine.stop();

};

deploy();
