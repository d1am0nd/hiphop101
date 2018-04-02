import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getUser} from '@/store/selectors/auth';

const hasAuthListener = (Component) => {
  class HasAuthListener extends React.Component {
    constructor() {
      super();
      this.addAuthListener = this.addAuthListener.bind(this);
      this.state = {
        handleFunc: () => {},
      };
    }

    addAuthListener(handleFunc) {
      this.setState({
        handleFunc: handleFunc,
      });
    }

    componentDidUpdate(prevProps) {
      const {user: prevUser} = prevProps;
      const {user: newUser} = this.props;
      console.log(this.state);
      if (JSON.stringify(prevUser) !== JSON.stringify(newUser)) {
        this.state.handleFunc();
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          addAuthListener={this.addAuthListener}/>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      user: getUser(state),
    };
  };

  HasAuthListener.propTypes = {
    user: PropTypes.object,
  };

  return connect(mapStateToProps)(HasAuthListener);
};

export default hasAuthListener;
