import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {sidebar} from '@/routes';

export default class Menu extends Component {
  render() {
    return (
      <ul>
        {sidebar.map((route) => (
          <li key={route.path}>
            <Link to={route.path}>
              {route.info.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}
