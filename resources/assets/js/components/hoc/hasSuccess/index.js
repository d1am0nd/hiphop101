import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {openKhaled} from '@/store/actions/modal';

const hasSuccess = (WrappedComponent) => {
  const HasSuccess = (props) => {
    return (
      <WrappedComponent
        {...props}
        triggerSuccess={(title) => props.success(title)}
      />
    );
  };

  HasSuccess.propTypes = {
    success: PropTypes.func.isRequired,
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      success: (text) => dispatch(openKhaled('Success', text)),
    };
  };

  return connect(
    null,
    mapDispatchToProps
  )(HasSuccess);
};

export default hasSuccess;
