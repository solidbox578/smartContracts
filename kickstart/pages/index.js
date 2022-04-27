import React, {Component} from 'react';
import { Card, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

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
      <div>
        <h3> Open Comapigns </h3>
        {this.renderCompaign()}
        <Button
          content= "Create Compaign"
          icon="add circle"
          primary
        />
      </div>
    );
  }
}

export default CompaignIndex;
