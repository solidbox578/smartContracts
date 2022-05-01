import React, {Component} from 'react';
import Layout from '../../../components/Layout';
import { Form, Input, Button, Message} from 'semantic-ui-react';
import Compaign from '../../../ethereum/Compaign';
import web3 from '../../../ethereum/web3';
import { Link, Router} from '../../../routes';

class RequestNew extends Component{

  state = {
    value: '',
    description: '',
    recipientAddress: '',
    loading: false,
    errorMessage: ''
  };

  static async getInitialProps(props){
    const {address} = props.query;
    return {address: address};
  }

  onSubmit = async event => {
    event.preventDefault();

    const compaign = new Compaign(this.props.address);
    this.setState({loading: true, errorMessage:''});
    const {description, value, recipientAddress } = this.state;

    try{
      const accounts = await web3.eth.getAccounts();
      await compaign.methods.createRequest(
              description,
              web3.utils.toWei(value, 'ether'),
              recipientAddress)
          .send({from: accounts[0]});
      Router.pushRoute(`/compaigns/${this.props.address}/requests`);
    } catch (err){
      this.setState({errorMessage: err.message});
      console.log(err.message);
    }
    this.setState({loading: false, value: '', description: '', recipientAddress: ''});

  }

  render(){
    return (
      <Layout>
        <Link route={`/compaigns/${this.props.address}/requests`}>
          <a>Back</a>
        </Link>
        <h3> Create a Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Amount in Ether</label>
            <Input
              label="Ether"
              labelPosition="right"
              value={this.state.value}
              onChange={ event => this.setState({value: event.target.value}) }
              />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <Input
              label="Description"
              labelPosition="right"
              value={this.state.description}
              onChange={ event => this.setState({description: event.target.value}) }
              />
          </Form.Field>
          <Form.Field>
            <label>Recipient Address</label>
            <Input
              label="Address"
              labelPosition="right"
              value={this.state.recipientAddress}
              onChange={ event => this.setState({recipientAddress: event.target.value})}
            />
          </Form.Field>
          <Message error>
            <Message.Header>Opps!</Message.Header>
            <p>{this.state.errorMessage}</p>
          </Message>
          <Button primary loading={this.state.loading}>Create</Button>
        </Form>
      </Layout>
    )
  };
}

export default RequestNew;
