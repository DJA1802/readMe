import React from 'react';
import validator from 'validator';
import zxcvbn from 'zxcvbn';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';
import {
  Button,
  Divider,
  Header,
  Icon,
  Input,
  Segment
} from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

const required = value => (value ? undefined : 'Required');

const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined);

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <React.Fragment>
    <Input {...input} placeholder={label} type={type} />
    {touched && ((error && <p>{error}</p>) || (warning && <p>{warning}</p>))}
  </React.Fragment>
);

let SignupOrLoginForm = props => {
  const { name, displayName, handleSubmit, serverError } = props;
  return (
    <form onSubmit={handleSubmit} name={name}>
      <Field
        component={renderField}
        name="email"
        type="text"
        placeholder="Email"
        validate={[required, email]}
      />
      <Field
        component={renderField}
        name="password"
        type="password"
        placeholder="Password"
      />
      <div>
        <Button type="submit">{displayName}</Button>
      </div>
      {serverError &&
        serverError.response && <div> {serverError.response.data} </div>}
    </form>
  );
};

SignupOrLoginForm = reduxForm({ form: 'signupOrLogin' })(SignupOrLoginForm);

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, handleSubmit, serverError } = props;

  return (
    <Segment id="authform">
      <Header as="h3">{displayName}</Header>
      <Button
        className="authform-btn-oauth"
        as="a"
        href="/auth/google"
        icon
        labelPosition="left"
      >
        <Icon name="google" />
        {displayName} with Google
      </Button>
      <Button
        className="authform-btn-oauth"
        as="a"
        href="/auth/twitter"
        icon
        labelPosition="left"
      >
        <Icon name="twitter" />
        {displayName} with Twitter
      </Button>
      <Divider horizontal>Or</Divider>
      <SignupOrLoginForm
        name={name}
        onSubmit={handleSubmit}
        displayName={displayName}
        serverError={serverError}
      />
    </Segment>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    serverError: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    serverError: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit (evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  serverError: PropTypes.object
};
