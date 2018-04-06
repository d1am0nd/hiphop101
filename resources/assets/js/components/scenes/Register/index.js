import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {register} from '@/store/actions/auth';
import {closeModal, openLogin} from '@/store/actions/modal';
import {getErr} from '@/api/helpers';

import Form from '@/components/simple/form/Form';
import Input from '@/components/simple/form/Input';
import Submit from '@/components/simple/form/Submit';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      values: {
        email: '',
        name: '',
        password: '',
        password_confirmation: '',
      },
      errors: {
        email: [],
        name: [],
        password: [],
      },
    };
  }

  handleChange(e) {
    const {target} = e;
    this.setState({
      ...this.state,
      values: {
        ...this.state.values,
        [target.name]: target.value,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this
      .props
      .postRegister(this.state.values)
      .then((res) => {
        this.props.closeModal();
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          errors: {
            ...this.state.errors,
            ...getErr(err),
          },
        });
      });
  }

  render() {
    const {errors} = this.state;
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
            errors={errors.email}
            handleChange={(e) => this.handleChange(e)}
            label="Email"/>
          <Input
            handleChange={(e) => this.handleChange(e)}
            attributes={{
              name: 'name',
              placeholder: 'Username',
            }}
            errors={errors.name}
            label="Username"/>
          <Input
            handleChange={(e) => this.handleChange(e)}
            attributes={{
              name: 'password',
              type: 'password',
              placeholder: 'Password',
            }}
            errors={errors.password}
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
