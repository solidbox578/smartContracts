import web3 from './web3';
import compaignFactory from './build/CompaignFactory.json';

const instance = new web3.eth.Contract(
  compaignFactory.abi,
  '0xd7bCeE0cECBC048CD9d02840a41da9baE0E7d7c6'
);

export default instance;
