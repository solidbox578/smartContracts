import { Component } from 'react';
import web3 from './web3';
import compaign from './build/Compaign.json';

class Compaign extends Component{
  constructor(address){
    return new web3.eth.Contract(compaign.abi, address);
  }
}

export default Compaign;
