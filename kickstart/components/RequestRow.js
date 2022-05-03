import React, {Component} from 'react';
import { Table, Button, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Compaign from '../ethereum/Compaign';
import { Router } from '../routes';


class RequestRow extends Component{

  state = {
    loadingApprove: false,
    errorMessageApprove: '',
    loadingFinalize: false,
    errorMessageFinalize: ''
  };

   onApprove = async () => {
    const compaign = new Compaign(this.props.address);
    this.setState({loadingApprove: true, errorMessageApprove: ''});
    try{
        const accounts = await web3.eth.getAccounts();
        await compaign.methods.approveRequest(this.props.id).send({ from: accounts[0] });
      } catch(err){
        this.setState({errorMessageApprove: err.message});
      }
    this.setState({loadingApprove: false});
    Router.pushRoute(`/compaigns/${this.props.address}/requests`);
  };

  onFinalize = async () => {
    const compaign = new Compaign(this.props.address);
    this.setState({loadingFinalize: true, errorMessageFinalize:''});
    try{
      const accounts = await web3.eth.getAccounts();
      await compaign.methods.finalizeRequest(this.props.id).send({from: accounts[0]});
    } catch(err){
      this.setState({errorMessageFinalize: err.message});
    }
    this.setState({loadingFinalize: false});
    Router.pushRoute(`/compaigns/${this.props.address}/requests`);
  };

  render(){
    const { Row, Cell } = Table;
    const {id, description, request, approversCount} = this.props;
    const readyToFinalize = request.approvalsCount > approversCount / 2;

    return (
      <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{request.approvalsCount}/{approversCount}</Cell>
        <Cell>
          <Button basic disabled={request.complete}
                color="green"
                onClick={this.onApprove}
                loading = {this.state.loadingApprove} >
            Approve
          </Button>
          {
            !this.state.errorMessageApprove ? null :
            ( <div style={{marginTop: 10}}>
              <Message error>
                <p>{this.state.errorMessageApprove}</p>
              </Message>
            </div> )
          }
        </Cell>
        <Cell>
          <Button basic disabled={request.complete}
              color="teal"
              onClick={this.onFinalize}
              loading={this.state.loadingFinalize}
          >
          Finalize
          </Button>
            {
            !this.state.errorMessageFinalize ? null :
            ( <div style={{marginTop: 10}}>
              <Message error>
                <p>{this.state.errorMessageFinalize}</p>
              </Message>
            </div> )
           }
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
