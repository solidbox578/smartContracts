import React, {Component} from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/layout';
import factory from '../ethereum/factory';
import { Link } from '../routes';

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
        description: (
            <Link route={`/compaigns/${address}`}>
              <a>View Compaign</a>
            </Link>
        ),
        fluid: true
      }
    });
    return <Card.Group items={items} />;
  }

  render(){
    return (
      <Layout>
        <h3> Open Comapigns </h3>
        <Link route="/compaigns/new">
          <a>
            <Button
              floated="right"
              content= "Create Compaign"
              icon="add circle"
              primary
            />
          </a>
        </Link>
        {this.renderCompaign()}
      </Layout>
    );
  }
}

export default CompaignIndex;
