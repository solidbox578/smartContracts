//=========********************========================
//  Deployment with infura API on testnet or mainnet
//=========********************========================
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('Web3');
const CompaignFactory = require('./build/CompaignFactory.json');

const provider = new HDWalletProvider(
  'bring guard river sauce bunker concert fork wedding spatial lonely choose exist',
  'https://rinkeby.infura.io/v3/e7d32b84431046319dd7959d1c9f1c35'
);

const web3 = new Web3(provider);

const deploy = async () =>{
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from the account', accounts[0]);

  const result = await new web3.eth.Contract(CompaignFactory.abi)
              .deploy({data : CompaignFactory.evm.bytecode.object})
              .send({gas : '3000000', from : accounts[0]});

  // console.log('ABI Interface', abi);//Not this one
  var util = require('util');
  console.log(util.inspect(CompaignFactory.abi,false,null,true));

  console.log('Contract deployed to address', result.options.address);

  provider.engine.stop();

};

deploy();
