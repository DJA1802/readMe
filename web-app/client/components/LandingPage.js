import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { Login, Signup } from '.';

const LandingPage = () => {
  return (
    <div id="land-pg-container">
      <div id="land-pg-top-bar">
        <div id="land-pg-name">readMe</div>
        <Modal
          trigger={<div id="land-pg-login-btn">Log In</div>}
          id="auth-modal"
        >
          <Login />
        </Modal>
      </div>
      <div id="carousel">
        <img src="/landing-page-1.jpg" className="carousel-image" />
        <div id="carousel-overlay">
          <img src="/splash-icon-800.png" id="land-pg-logo" />
          <div id="carousel-text">Your interests. Your habits. Your data.</div>
          <Modal
            trigger={
              <Button id="carousel-btn" size="massive">
                Sign Up
              </Button>
            }
            id="auth-modal"
          >
            <Signup />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
