import React, {Component} from 'react';

import Header from 'components/containers/Header';

export default class App extends Component {
  render() {
    return (
      <div className={`wrapper`}>
        <Header/>
      </div>
    );
  }
}
