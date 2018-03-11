import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({title, children, onClose}) => (
  <div className="modal">
    <div className="close">
      <div
        onClick={e => onClose(e)}
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

Modal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
