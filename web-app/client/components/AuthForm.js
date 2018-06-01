import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';
import { Button, Divider, Header, Icon, Segment } from 'semantic-ui-react';
import { SignupOrLoginForm } from '../components';

/* COMPONENT */
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
        onSubmit={formData => handleSubmit(formData, name)}
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
    handleSubmit (formData, formName) {
      const { email, password } = formData;
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
