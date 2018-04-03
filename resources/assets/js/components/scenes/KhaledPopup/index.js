import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {modalBottom} from '@/store/selectors/modal';

const KhaledPopup = ({bottom}) => {
  return (
    <div className="error-popup">
      <div className="dj-khaled">
        <img
          alt="DJ Khaled"
          title="You played yourself"
          src="/img/images/DjKhaled.png"/>
      </div>
      <div className="message">
        {bottom}
      </div>
    </div>
  );
};

KhaledPopup.propTypes = {
  bottom: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    bottom: modalBottom(state),
  };
};

export default connect(
  mapStateToProps
)(KhaledPopup);
