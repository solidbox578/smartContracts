import React from 'react';
import { Menu } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const header = () =>{
  return(
    <Menu style={{ margin:'10px' }}>
        <Menu.Item>
          Crowd Coin
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
          Comapigns
          </Menu.Item>

          <Menu.Item>
          +
          </Menu.Item>
        </Menu.Menu>
    </Menu>
  );
};

export default header;
