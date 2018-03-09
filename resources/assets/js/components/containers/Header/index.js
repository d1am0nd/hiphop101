import React, {Component} from 'react';

import Title from './Title';
import Profile from './Profile';

class Header extends Component {
  render() {
    return (
      <header className="head">
        <Title>
          Hip Hop 101
        </Title>
        <Profile>

        </Profile>
      </header>
    );
  }
}

export default Header;
