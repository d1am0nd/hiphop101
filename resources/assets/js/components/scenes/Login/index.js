import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/simple/Modal';

class Login extends Component {
  render() {
    <Modal open={true} title="test" onClose={function() {alert('test')}}>
      test
    </Modal>
  }
}
