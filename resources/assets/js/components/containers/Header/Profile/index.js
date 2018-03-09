import React from 'react';

export default ({children}) => (
  <div className="profile">
    {!children ? 'Login | Register' : children}
  </div>
);
