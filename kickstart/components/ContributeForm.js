import React, {Component} from 'react';
import {Form, Input, Message, Button} from 'semantic-ui-react';
import Compaign from '../ethereum/Compaign';
import web3 from '../ethereum/web3';
import {Router} from '../routes';

class ContributeForm extends Component {
  state = {
    donationValue: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({errorMessage: '', loading: true});
    const compaign = new Compaign(this.props.address);
    try{

      const accounts = await web3.eth.getAccounts();
      await compaign.methods.contribute().send({
          from: accounts[0],
          value: web3.utils.toWei(this.state.donationValue, 'ether')
        });
      Router.replaceRoute(`/compaigns/${this.props.address}`);
    } catch (err) {
      this.setState({errorMessage: err.message});
    }
    this.setState({loading: false, donationValue: ''});
  }

  render(){
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Contribute to this comapign</label>
          <Input
            label = "ether"
            labelPosition = "right"
            value = { this.state.donationValue }
            onChange = { event => this.setState({ donationValue: event.target.value }) }
          />
        </Form.Field>
        <Message error>
          <Message.Header>Opps!</Message.Header>
          <p>{this.state.errorMessage}</p>
        </Message>
        <Button primary loading={this.state.loading}>
          Donate
        </Button>
      </Form>
    );
  }

}

export default ContributeForm;
