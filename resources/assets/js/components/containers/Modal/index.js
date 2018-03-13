import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {
  isModalOpen,
  modalTitle,
} from 'store/selectors/modal';
import {
  closeModal,
} from 'store/actions/modal';

class Modal extends Component {
  render() {
    const {
      open,
      title,
      children,
      closeModal,
    } = this.props;
    return (
      <div key={title} className={`modal ${open === true ? '' : 'hide'}`}>
        <div className="close">
          <div
            onClick={e => closeModal()}
            className="icon"/>
        </div>
        <div className="title">
          {title}
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  closeModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    open: isModalOpen(state),
    title: modalTitle(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
