import React, {Component} from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/layout';
import factory from '../ethereum/factory';

class CompaignIndex extends Component{

  static async getInitialProps(){
    const compaign =  await factory.methods.getDeployedCompaign().call();
    console.log(compaign);
    return { compaign };
  }

  renderCompaign(){
    const items = this.props.compaign.map(address =>{
      return{
        header: address,
        description: <a>View Compagin</a>,
        fluid: true
      }
    });
    return <Card.Group items={items} />;
  }

  render(){
    return (
      <Layout>
        <h3> Open Comapigns </h3>
        <Button
          floated="right"
          content= "Create Compaign"
          icon="add circle"
          primary
        />
        {this.renderCompaign()}
      </Layout>
    );
  }
}

export default CompaignIndex;
