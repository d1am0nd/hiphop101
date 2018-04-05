import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {login} from '@/store/actions/auth';
import {closeModal, openRegister} from '@/store/actions/modal';

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
        alert('Wrong credentials');
        // alert(err.response.data.error);
      });
  }

  render() {
    return (
      <div>
        <div className="pre-form">
          Don{`'`}t have an account?{` `}
          <a
            href="javascript:;"
            onClick={(e) => this.props.openRegister(e)}>
            Register here
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
            attributes={{
              type: 'password',
              name: 'password',
              placeholder: 'Password',
            }}
            handleChange={(e) => this.handleChange(e)}
            label="Password"/>
          <Submit text="Submit"/>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
  postLogin: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  openRegister: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    postLogin: (creds) => dispatch(login(creds)),
    closeModal: () => dispatch(closeModal()),
    openRegister: () => dispatch(openRegister()),
  };
};

export default connect(null, mapDispatchToProps)(Login);
