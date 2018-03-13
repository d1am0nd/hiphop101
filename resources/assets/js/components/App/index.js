import React, {Component} from 'react';

import Header from 'components/containers/Header';
import Navigation from 'components/containers/Navigation';
import Content from 'components/containers/Content';
import Footer from 'components/containers/Footer';
import Modal from 'components/containers/Modal';

class App extends Component {
  render() {
    return (
      <div className={`wrapper`}>
        <Header/>
        <Navigation/>
        <Content>
          Home
        </Content>
        <Footer/>

        <Modal/>
      </div>
    );
  }
}

export default App;
