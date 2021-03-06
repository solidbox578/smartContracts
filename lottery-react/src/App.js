// import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from './web3';
import lottery from './lottery';

class App extends React.Component {
  // Equivalent to the constructor code
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: '',
    winner: ''
  };

  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayersList().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) =>{
      event.preventDefault();

      const accounts = await web3.eth.getAccounts();

      this.setState({message: 'Waiting on transaction success....'});

      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });

      this.setState({message: 'You have successfully entered into the Lottery!'});
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Waiting on transaction success....'});

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    const winner = await lottery.methods.winner().call();
    this.setState({
        message : 'A winner has been picked',
        winner: winner
    });
  };

  render() {
    //web3.eth.getAccounts().then(console.log);
    return (
      <div>
      <h2>Lottery Contract</h2>
      <p>
      This contract is managed by {this.state.manager}.
      <br/>
      There are currently {this.state.players.length} people entered
      competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
      </p>
      <hr/>

      <form onSubmit={this.onSubmit}>
        <h4>Want to try your luck!</h4>
        <div>
          <label>Amount of Ether to enter</label>
          <input
            value={this.state.value}
            onChange={event => this.setState({value: event.target.value})}
          />
        </div>
        <button>Enter</button>
      </form>

      <hr/>
      <h4>Ready to Pick a winner</h4>
      <button onClick={this.onClick}>Pick the Winner</button>

      <hr/>
      <h1>{this.state.message} {this.state.winner}</h1>

      </div>
    );
  }
}
export default App;
