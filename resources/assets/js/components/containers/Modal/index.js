import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Times from '@/components/icons/Times';
import Login from '@/components/scenes/Login';
import Register from '@/components/scenes/Register';
import KhaledPopup from '@/components/scenes/KhaledPopup';
import {
  isModalOpen,
  modalTitle,
  modalType,
} from '@/store/selectors/modal';
import {
  closeModal,
} from '@/store/actions/modal';

class Modal extends Component {
  handleModalClick(e) {
    e.stopPropagation();
  }

  handleBackgroundClick(e) {
    this.props.closeModal();
  }

  renderContent() {
    switch (this.props.type) {
    case 'login': {
      return <Login/>;
    }
    case 'register': {
      return <Register/>;
    }
    case 'khaled': {
      return <KhaledPopup/>;
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
      <div
        onClick={(e) => this.handleBackgroundClick(e)}
        className={`modal-wrapper ${open === true ? '' : 'hide-modal'}`}>
        <div
          onClick={(e) => this.handleModalClick(e)}
          key={title} className="modal">
          <div className="close">
            <div
              onClick={(e) => closeModal()}
              className="icon"/>
            <Times
              attributes={{
                onClick: (e) => closeModal(),
              }}/>
          </div>
          <div className="title">
            {title}
          </div>
          <div className="modal-content">
            {this.renderContent()}
          </div>
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
