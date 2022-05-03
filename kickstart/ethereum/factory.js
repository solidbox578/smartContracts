import web3 from './web3';
import compaignFactory from './build/CompaignFactory.json';

const instance = new web3.eth.Contract(
  compaignFactory.abi,
  '0xf9B1B87DCd587DD133aC23D85610b06c26D8bd03'
);

export default instance;
