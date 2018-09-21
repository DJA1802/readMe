import React from 'react';
import { Login, NavbarTop, Message } from '.';
/**
 * COMPONENT
 */
const LoginPage = () => (
  <React.Fragment>
    <NavbarTop />
    <Message />
    <div id="authform-page-container">
      <div id="authform-container">
        <Login />
      </div>
    </div>
  </React.Fragment>
);

export default LoginPage;
