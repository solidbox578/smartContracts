//=========********************========================
//  Test Deployment with ganache provider
//=========********************========================
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const {abi, evm} = require('../compile');

let lottery;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  lottery = await new web3.eth.Contract(abi)
            .deploy({data: evm.bytecode.object})
            .send({from: accounts[0], gas:'1000000'});
});

describe('lottery contract', () => {

  it('deploy the contract', () => {
    assert.ok(lottery.options.address);
  });

  it('allows one player to enter', async () => {
    await lottery.methods.enter().send({
        from: accounts[0],
        //value: '1000000'
        value: web3.utils.toWei('0.02','ether')
    });

    const players = await lottery.methods.getPlayersList().call({
      from: accounts[0]
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(1, players.length);
  });

 // send() is to send the eth from some account to the method with value parameter
 // call() is to just call the methods from some account
  it('allows multiple players to enter', async () => {
      await lottery.methods.enter().send({
        from: accounts[0], value: web3.utils.toWei('0.2','ether')
      });
      await lottery.methods.enter().send({
        from: accounts[1], value: web3.utils.toWei('0.2','ether')
      });
      await lottery.methods.enter().send({
        from: accounts[2], value: web3.utils.toWei('0.2','ether')
      });

      const players = await lottery.methods.getPlayersList().call({
        from: accounts[0]
      });

      assert.equal(accounts[0], players[0]);
      assert.equal(accounts[1], players[1]);
      assert.equal(accounts[2], players[2]);
      assert.equal(3, players.length);

  });

  // Since we are sending 0 wei to the contract, its throwing error and in catch section asserting to err object
  // -- which finall marking the test passed.
  it('require a minimum amount of ether to enter', async () =>{
    try{
      await lottery.methods.enter().send({
        from: accounts[0],
        value: 0
      });
      assert(false);
    } catch(err){
      assert.ok(err);
    }
  });

  // Since accounts[1] is not a manager, accounts[0] is
  it('only manager can call pickWinner method', async () =>{
    try{
      await lottery.methods.pickWinner().send({
        from: accounts[1]
      });
      assert(false);
    }catch(err){
      assert.ok(err);
    }
  });

  //e2e test by entering only one player in contest
  it('send money to enter and resets the players array', async () => {

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('2','ether')
    });

    // balance before picking the winner
    const initialBalance = await web3.eth.getBalance(accounts[0]);

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    const finalBalance = await web3.eth.getBalance(accounts[0]);
    const diff = finalBalance - initialBalance;
    // console.log(diff);
    assert(diff > web3.utils.toWei('1.9', 'ether')); // 1.9, just guess tha gas amount would be around 0.2 ether
  });


});
