import React, {Component} from 'react';

import Title from './Title';
import Auth from './Auth';

class Header extends Component {
  render() {
    return (
      <header className="head">
        <Title>
          Hip Hop 101
        </Title>
        <Auth/>
      </header>
    );
  }
}

export default Header;
