import React from 'react';
import {Redirect} from 'react-router-dom';

import {isAuthenticated} from '@/auth/store';

const authOnly = (Component) => {
  const AuthOnly = () => (
    /*
    <Component/>
    */
    isAuthenticated() ?
      <Component/> :
      <Redirect to="/" push/>
  );
  return AuthOnly;
};

export default authOnly;
