import React, {Component} from 'react';
import web3 from '../../ethereum/web3';
import Layout from '../../components/Layout';
import { Card, Grid, Button } from 'semantic-ui-react';
import Compaign from '../../ethereum/compaign';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';


class showCompaign extends Component{

  static async getInitialProps(props){
    const compaign = new Compaign(props.query.address);
    const summary = await compaign.methods.getSummary().call();

    return {
      'address' : props.query.address,
      'minimumContribution' : summary[0],
      'balance' : summary[1],
      'approversCount' : summary[2],
      'requestsCount' : summary[3],
      'manager' : summary[4]
    };
  };

  renderCard(){
    const {
      minimumContribution,
      balance,
      approversCount,
      requestsCount,
      manager
    } = this.props;

    const items = [
      {
        header : manager,
        meta : 'Address of manager',
        description : 'The Manager created this request and can create requests to withdraw money',
        style : { overflowWrap: 'break-word' }
      },
      {
        header : minimumContribution,
        meta : 'Minimum Contrinution (in Wei)',
        description : 'Minimum Contrinution allowed'
      },
      {
        header : requestsCount,
        meta : 'Total request count',
        description : 'A request tries to withdraw money from the contract. Request must be approved by approvers by more than 50%'
      },
      {
        header : approversCount,
        meta : 'Number of Approvers',
        description : 'Number of people who have donated to this compaign'
      },
      {
        header : web3.utils.fromWei(balance, 'ether'),
        meta : 'Compaign balance (in ether)',
        description : 'Balance left in this comapign'
      }

    ];
    return <Card.Group items={items} />;
  }

  render(){
    return (
        <Layout>
        <h3>Compaign Show </h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCard()}
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/compaigns/${this.props.address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Layout>
    );
  };

}

export default showCompaign;
