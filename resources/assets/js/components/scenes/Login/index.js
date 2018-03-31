import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {login} from '@/store/actions/auth';
import {closeModal} from '@/store/actions/modal';

import Form from '@/components/simple/form/Form';
import Input from '@/components/simple/form/Input';
import Submit from '@/components/simple/form/Submit';

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
      <Form handleSubmit={(e) => this.handleSubmit(e)}>
        <Input
          attributes={{
            autoFocus: true,
            type: 'email',
            name: 'email',
            placeholder: 'Email',
          }}
          handleChange={(e) => this.handleChange(e)}
          label="Email"/>
        <Input
          attributes={{
            type: 'password',
            name: 'password',
            placeholder: 'Password',
          }}
          handleChange={(e) => this.handleChange(e)}
          label="Password"/>
        <Submit text="Submit"/>
      </Form>
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
