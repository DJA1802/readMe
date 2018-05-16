import React from 'react';
import { Signup, NavbarTop, Message } from '.';

/**
 * COMPONENT
 */
const SignupPage = () => (
  <React.Fragment>
    <NavbarTop />
    <Message />
    <div id="authform-page-container">
      <div id="authform-container">
        <Signup />
      </div>
    </div>
  </React.Fragment>
);

export default SignupPage;
