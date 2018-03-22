import React from 'react';
import {Redirect} from 'react-router-dom';

import {isAuthenticated} from '@/auth/store';

const authOnly = (Component) => {
  const AuthOnly = () => (
    isAuthenticated() ?
      <Component/> :
      <Redirect to="/faq" push />
  );
  /*
  if (!isAuthenticated()) {
  }
  */
  return AuthOnly;
};

export default authOnly;
