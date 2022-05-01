import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes'
import Layout from '../../../components/Layout';


class RequestsIndex extends Component{
  static async getInitialProps(props){
    const { address } = props.query;
    return { address: address };
  };

  render(){
    return (
      <Layout>
        <h3>Requests List </h3>
        <Link route={`/compaigns/${this.props.address}/requests/new`}>
          <a>
          <Button primary>Add Request</Button>
          </a>
        </Link>
      </Layout>
    );
  };
}

export default RequestsIndex;