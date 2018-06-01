import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { isFilledOut, isEmail } from '../utils/formValidations';
import { FieldWithWarning } from '../components';

const SignupOrLoginForm = props => {
  const { name, displayName, handleSubmit, serverError } = props;
  return (
    <form onSubmit={handleSubmit} name={name}>
      <Field
        component={FieldWithWarning}
        name="email"
        type="text"
        placeholder="Email"
        validate={[isFilledOut, isEmail]}
      />
      <Field
        component={FieldWithWarning}
        name="password"
        type="password"
        placeholder="Password"
        validate={[isFilledOut]}
      />
      <div>
        <Button type="submit">{displayName}</Button>
      </div>
      {serverError &&
        serverError.response && <div> {serverError.response.data} </div>}
    </form>
  );
};

export default reduxForm({ form: 'signupOrLogin' })(SignupOrLoginForm);
