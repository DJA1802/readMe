import React from 'react';
import { hot } from 'react-hot-loader';
import { Button } from 'semantic-ui-react';

const AuthForm = props => {
  const { handleSubmit } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} name="login">
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <Button type="submit">Login</Button>
        </div>
      </form>
      <a href="/auth/google">Login with Google</a>
    </div>
  );
};

export default hot(module)(AuthForm);
