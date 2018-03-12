import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Modal from 'components/simple/Modal';

import {toggleRegisterModal} from 'store/actions/modal';
import {isRegisterOpen} from 'store/selectors/modal';

class Register extends Component {
  render() {
    return (
      <Modal
        open={this.props.open}
        title="Register"
        onClose={e => this.props.closeModal()}>
        Register form
      </Modal>
    );
  }
}

Register.propTypes = {
  open: PropTypes.bool,
  closeModal: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(toggleRegisterModal(false)),
  };
};

const mapStateToProps = state => {
  return {
    open: isRegisterOpen(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
