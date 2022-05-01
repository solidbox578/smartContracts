import web3 from './web3';
import compaignFactory from './build/CompaignFactory.json';

const instance = new web3.eth.Contract(
  compaignFactory.abi,
  '0xE35b3598be724e538CE8FE4eA92410aecA16d4C3'
);

export default instance;
