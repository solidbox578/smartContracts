const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CompaignFactory.json');
const compiledCompaign = require('../ethereum/build/Compaign.json');

let accounts;
let factory;
let compaignAddress;
let compaign;
var minimumContribution = '100';

beforeEach( async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(compiledFactory.abi)
              .deploy({data: compiledFactory.evm.bytecode.object})
              .send({from: accounts[0], gas: '3000000'});

  await factory.methods.createCompaign(minimumContribution).send({
    from: accounts[0], gas: '3000000'
  });

  // [compaignAddress]  means first index from response array and store in compaignAddress
  [compaignAddress] = await factory.methods.getDeployedCompaign().call();

  //deploy contract with just address
  compaign = await new web3.eth.Contract(compiledCompaign.abi, compaignAddress);

});

describe('compaign', () => {
  it('deploys a factory and a compaign', () => {
      assert.ok(factory.options.address);
      assert.ok(compaign.options.address);
  });

  it('marks caller as the compaign manager', async () => {
      const manager = await compaign.methods.manager().call();
      assert.equal(accounts[0], manager);
  });

  it('allows people to contribute and become approvers', async () => {
    await compaign.methods.contribute().send({
      from: accounts[1],
      value: '200'
    });

    const isApprover = await compaign.methods.approvers(accounts[1]).call();
    assert(isApprover);

  });

  it('require a minimum contribution', async () => {
      try{
        await compaign.methods.contribute().send({
          value: '5',
          from: accounts[1]
        });
        assert(false);
      }catch(err){
        assert(err);
      }
  });

  it('allows a manager to make a payment request', async () =>{
    await compaign.methods
            .createRequest('Buy Batteries', '100', accounts[1])
            .send({from: accounts[0], gas: '1000000'});
    const request = await compaign.methods.requests(0).call();
    assert.equal('Buy Batteries', request.description);
  });

  it('e2e', async() => {
      await compaign.methods.contribute().send({
        value: web3.utils.toWei('5', 'ether'), from: accounts[0]
      });

      await compaign.methods
          .createRequest("Buy bulb", web3.utils.toWei('2','ether'), accounts[1])
          .send({from: accounts[0], gas:'1000000'});

      let request = await compaign.methods.requests(0).call();
      assert.equal('Buy bulb', request.description);

      await compaign.methods
                .approveRequest(0)
                .send({from: accounts[0], gas:'1000000'});

      await compaign.methods
                      .finalizeRequest(0)
                      .send( { from: accounts[0], gas: '1000000'});

      let balance = await web3.eth.getBalance(accounts[1]);
      balance = web3.utils.fromWei(balance, 'ether');
      balance = parseFloat(balance);

      // console.log(balance);
      assert(balance > 101);

  });

});
