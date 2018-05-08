import React from 'react';
import { hot } from 'react-hot-loader';
import { Button, Input } from 'semantic-ui-react';

const AuthForm = props => {
  const { handleSubmit } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} name="login">
        <Input name="email" label="Email" type="text" />
        <Input name="password" label="Password" type="password" />
        <Button type="submit">Login</Button>
      </form>
      <a href="/auth/google">Login with Google</a>
    </div>
  );
};

export default hot(module)(AuthForm);
