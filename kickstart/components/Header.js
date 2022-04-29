import React from 'react';
import { Menu } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { Link } from '../routes';

const header = () =>{
  return(
    <Menu style={{ margin:'10px' }}>
        <Link route="/">
          <a className="item">Crowd Coin</a>
        </Link>

        <Menu.Menu position="right">
          <Link route="/">
            <a className="item">Comapigns</a>
          </Link>

          <Link route="/compaigns/new">
            <a className="item">+</a>
          </Link>
        </Menu.Menu>
    </Menu>
  );
};

export default header;
