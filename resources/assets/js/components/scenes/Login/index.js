import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Modal from 'components/simple/Modal';

import {toggleLoginModal} from 'store/actions/modal';
import {isLoginOpen} from 'store/selectors/modal';

class Login extends Component {
  render() {
    return (
      <Modal
        open={this.props.open}
        title="Login"
        onClose={e => this.props.closeModal()}>
        Login form
      </Modal>
    );
  }
}

Login.propTypes = {
  open: PropTypes.bool,
  closeModal: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(toggleLoginModal(false)),
  };
};

const mapStateToProps = state => {
  return {
    open: isLoginOpen(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
