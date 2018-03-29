import React from 'react';

import Search from './Search';
import Menu from './Menu';

const Navigation = () => {
  return (
    <nav className="nav">
      <Search placeholder="Search..."/>
      <Menu/>
    </nav>
  );
};

export default Navigation;
