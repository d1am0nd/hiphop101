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
    const {likesCount, alreadyLiked, canLike} = this.props;
    console.log('canLike', canLike);
    console.log(alreadyLiked);
    return (
      <div className="like-container">
        <div
          title="Total likes"
          className="like-count">
          {likesCount}
        </div>
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
  likesCount: PropTypes.number.isRequired,
  postLike: PropTypes.func.isRequired,
  postUnlike: PropTypes.func.isRequired,
  handleUnlike: PropTypes.func,
  handleLike: PropTypes.func,
  openRegister: PropTypes.func.isRequired,
  alreadyLiked: PropTypes.bool.isRequired,
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
