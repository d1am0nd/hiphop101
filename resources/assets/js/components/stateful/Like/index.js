import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {isAuthenticated} from '@/auth/store';
import {openRegister} from '@/store/actions/modal';

import ChevronUp from '@/components/icons/ChevronUp';

class Like extends Component {
  handleLike(e) {
    const {postLike, handleLike} = this.props;
    if (isAuthenticated()) {
      postLike()
        .then((res) => {
          handleLike(res);
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
          handleUnlike(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    const {likesCount, alreadyLiked} = this.props;
    return (
      <div className="like-container">
        <div className="like-count">
          {likesCount}
        </div>
        {!alreadyLiked ?
          <div
            onClick={(e) => this.handleLike(e)}
            className="like-icon">
            <ChevronUp/>
          </div> :
          <div
            onClick={(e) => this.handleUnlike(e)}
            className="like-unlike">
            <a href="javascript:;">
              Unlike
            </a>
          </div>}
      </div>
    );
  }
}

Like.propTypes = {
  likesCount: PropTypes.number.isRequired,
  postLike: PropTypes.func.isRequired,
  postUnlike: PropTypes.func.isRequired,
  handleUnlike: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
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
