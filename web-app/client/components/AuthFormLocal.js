import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import {
  isFilledOut,
  isEmail,
  isStrongPassword
} from '../utils/formValidations';
import { FieldWithWarning } from '../components';

const loginPasswordValidations = [isFilledOut];
const signupPasswordValidations = [isFilledOut, isStrongPassword];

const AuthFormLocal = props => {
  const { name, displayName, handleSubmit, serverError } = props;
  return (
    <form onSubmit={handleSubmit} name={name} id="authform-local">
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
        validate={
          name === 'signup'
            ? signupPasswordValidations
            : loginPasswordValidations
        }
      />
      <div>
        <Button type="submit">{displayName}</Button>
      </div>
      {serverError &&
        serverError.response && (
          <div>
            {serverError.response.status === 500 ? (
              <p>
                There was a server error. You can report this issue
                <a href="https://github.com/DJA1802/readMe/issues"> here</a>.
              </p>
            ) : (
              serverError.response.data
            )}
          </div>
        )}
    </form>
  );
};

export default reduxForm({ form: 'authFormLocal' })(AuthFormLocal);
