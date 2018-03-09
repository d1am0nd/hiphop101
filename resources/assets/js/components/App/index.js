import React, {Component} from 'react';

import Header from 'components/containers/Header';
import Navigation from 'components/containers/Navigation';

export default class App extends Component {
  render() {
    return (
      <div className={`wrapper`}>
        <Header/>
        <Navigation/>
      </div>
    );
  }
}
