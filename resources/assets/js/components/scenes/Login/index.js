import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {login} from '@/store/actions/auth';
import {closeModal} from '@/store/actions/modal';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange(e) {
    const {target} = e;
    this.setState({
      [target.name]: target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this
      .props
      .postLogin(this.state)
      .then((res) => {
        this.props.closeModal();
      })
      .catch((err) => {
        console.log('err triggered', err);
        // alert(err.response.data.error);
      });
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <input
          onChange={(e) => this.handleChange(e)}
          type="email"
          name="email"
          placeholder="Email"/>
        <input
          onChange={(e) => this.handleChange(e)}
          type="password"
          name="password"
          placeholder="Password"/>
        <input
          type="submit"
          value="Submit"/>
      </form>
    );
  }
}

Login.propTypes = {
  postLogin: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    postLogin: (creds) => dispatch(login(creds)),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(null, mapDispatchToProps)(Login);
