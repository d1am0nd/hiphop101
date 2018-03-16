import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Login from '@/components/scenes/Login';
import {
  isModalOpen,
  modalTitle,
  modalType,
} from '@/store/selectors/modal';
import {
  closeModal,
} from '@/store/actions/modal';

class Modal extends Component {
  renderContent() {
    switch (this.props.type) {
    case 'login': {
      return <Login/>;
    }
    case 'register': {
      break;
    }
      return null;
    }
  }

  render() {
    const {
      open,
      title,
      closeModal,
    } = this.props;
    return (
      <div key={title} className={`modal ${open === true ? '' : 'hide'}`}>
        <div className="close">
          <div
            onClick={(e) => closeModal()}
            className="icon"/>
        </div>
        <div className="title">
          {title}
        </div>
        <div className="modal-content">
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  type: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    open: isModalOpen(state),
    title: modalTitle(state),
    type: modalType(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
