import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {isAuthenticated} from '@/auth/store';
import {openRegister} from '@/store/actions/modal';

import SnoopUp from '@/components/icons/SnoopUp';
import SnoopDown from '@/components/icons/SnoopDown';

class Like extends Component {
  handleLike(e) {
    const {postLike, handleLike} = this.props;
    if (isAuthenticated()) {
      postLike()
        .then((res) => {
          if (handleLike) {
            handleLike(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.props.openRegister();
    }
  }

  handleUnlike(e) {
    const {postUnlike, handleUnlike} = this.props;
    if (isAuthenticated()) {
      postUnlike()
        .then((res) => {
          if (handleUnlike) {
            handleUnlike(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    const {alreadyLiked, canLike} = this.props;
    return (
      <div className="like-container">
        {canLike ?
          !alreadyLiked ?
            <div
              onClick={(e) => this.handleLike(e)}
              title="Like"
              className="like-icon">
              <SnoopDown/>
            </div> :
            <div
              onClick={(e) => this.handleUnlike(e)}
              className="like-unlike">
              <SnoopUp/>
            </div>
          : null}
      </div>
    );
  }
}

Like.propTypes = {
  canLike: PropTypes.bool.isRequired,
  postLike: PropTypes.func,
  postUnlike: PropTypes.func,
  handleUnlike: PropTypes.func,
  handleLike: PropTypes.func,
  openRegister: PropTypes.func,
  alreadyLiked: PropTypes.bool,
};

const mapDispatchToProps = (dispatch) => {
  return {
    openRegister: () => dispatch(openRegister()),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Like);
