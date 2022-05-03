import React, { Component } from 'react';
import { Button , Table, Grid } from 'semantic-ui-react';
import { Link } from '../../../routes'
import Layout from '../../../components/Layout';
import Compaign from '../../../ethereum/Compaign';
import RequestRow from '../../../components/RequestRow';


class RequestsIndex extends Component{
  static async getInitialProps(props){
    const { address } = props.query;

    const compaign = new Compaign(address);
    const requestCount = await compaign.methods.getRequestCount().call();
    const approversCount = await compaign.methods.approversCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount)).fill().map((element, index) => {
        return compaign.methods.requests(index).call()
      })
    );

    return { address, requests, requestCount, approversCount };
  };

  renderRow(){
    return this.props.requests.map((request, index) => {
      return <RequestRow
                key={index}
                id={index}
                request={request}
                address={this.props.address}
                approversCount={this.props.approversCount}
            />
    });
  };

  render(){
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h3>Requests List </h3>
        <Grid>
          <Grid.Row>
            <Grid.Column widhth={8} floated='left'>
              <Link route={`/compaigns/${this.props.address}`}>
                <a>Back</a>
              </Link>
            </Grid.Column>
            <Grid.Column width={8} floated='right'>
              <Link route={`/compaigns/${this.props.address}/requests/new`}>
                <a>
                <Button primary floated="right">Add Request</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>ApprovalCount</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>
            {this.renderRow()}
          </Body>
        </Table>
        <div>Found {this.props.requestCount} request.</div>
      </Layout>
    );
  };
}

export default RequestsIndex;
