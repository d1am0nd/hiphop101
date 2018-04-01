import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {register} from '@/store/actions/auth';
import {closeModal, openLogin} from '@/store/actions/modal';

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
      <div>
        <div className="pre-form">
          Already have an account?{` `}
          <a
            href="javascript:;"
            onClick={(e) => this.props.openLogin(e)}>
            Login here
          </a>.
        </div>
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
            handleChange={(e) => this.handleChange(e)}
            attributes={{
              name: 'name',
              placeholder: 'Username',
            }}
            label="Username"/>
          <Input
            handleChange={(e) => this.handleChange(e)}
            attributes={{
              name: 'password',
              type: 'password',
              placeholder: 'Password',
            }}
            label="Password"/>
          <Input
            handleChange={(e) => this.handleChange(e)}
            attributes={{
              name: 'password_confirmation',
              type: 'password',
              placeholder: 'Confirm password',
            }}
            label="Confirm password"/>
          <Submit text="Submit"/>
        </Form>
      </div>
    );
  }
}

Register.propTypes = {
  postRegister: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  openLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    postRegister: (userInfo) => dispatch(register(userInfo)),
    closeModal: () => dispatch(closeModal()),
    openLogin: () => dispatch(openLogin()),
  };
};

export default connect(null, mapDispatchToProps)(Register);
