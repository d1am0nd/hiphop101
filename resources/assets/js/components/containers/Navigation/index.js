import React, {Component} from 'react';

import Search from './Search';
import Menu from './Menu';

export default class Navigation extends Component {
  render() {
    return (
      <nav className="nav">
        <Search placeholder="Search..."/>
        <Menu/>
      </nav>
    );
  }
}
