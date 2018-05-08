import React from "react";
import { hot } from "react-hot-loader";

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
          <button type="submit">Login</button>
        </div>
      </form>
      <a href="/auth/google">Login with Google</a>
    </div>
  );
};

export default hot(module)(AuthForm);
