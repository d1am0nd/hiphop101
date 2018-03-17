import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {register} from '@/store/actions/auth';
import {closeModal} from '@/store/actions/modal';

import Form from '@/components/simple/form/Form';
import Input from '@/components/simple/form/Input';
import Submit from '@/components/simple/form/Submit';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      password: '',
      password_confirmation: '',
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
      .postRegister(this.state)
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
          handleChange={(e) => this.handleChange(e)}
          autoFocus={true}
          type="email"
          name="email"
          placeholder="Email"
          label="Email"/>
        <Input
          handleChange={(e) => this.handleChange(e)}
          name="name"
          placeholder="Username"
          label="Username"/>
        <Input
          handleChange={(e) => this.handleChange(e)}
          type="password"
          name="password"
          placeholder="Password"
          label="Password"/>
        <Input
          handleChange={(e) => this.handleChange(e)}
          type="password"
          name="password_confirmation"
          placeholder="Confirm password"
          label="Confirm password"/>
        <Submit text="Submit"/>
      </Form>
    );
  }
}

Register.propTypes = {
  postRegister: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    postRegister: (userInfo) => dispatch(register(userInfo)),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(null, mapDispatchToProps)(Register);
