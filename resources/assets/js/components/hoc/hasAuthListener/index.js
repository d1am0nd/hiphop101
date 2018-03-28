import React from 'react';

import {name as authChanged} from '@/events/authchanged';

const hasAuthListener = (Component) => {
  class HasAuthListener extends React.Component {
    addAuthListener(handleFunc) {
      window.addEventListener(`${authChanged}`, handleFunc);
    }

    removeAuthListener(handleFunc) {
      window.addEventListener(`${authChanged}`, handleFunc);
    }

    render() {
      return (
        <Component
          {...this.props}
          addAuthListener={this.addAuthListener}
          removeAuthListener={this.removeAuthListener}/>
      );
    }
  }

  return HasAuthListener;
};

export default hasAuthListener;
