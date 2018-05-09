import React, { Component } from 'react';
import axios from 'axios';
import { hot } from 'react-hot-loader';
import { Button, Input } from 'semantic-ui-react';

class AuthForm extends Component {
  constructor () {
    super();
    this.state = {
      isLoggedIn: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin (evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    axios
      .post(`http://localhost:8080/auth/${formName}`, { email, password })
      .then(() => {
        console.log('logged in!');
        this.setState({ isLoggedIn: true });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleLogout (evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    axios
      .post(`http://localhost:8080/auth/${formName}`)
      .then(() => {
        console.log('logged out!');
        this.setState({ isLoggedIn: false });
      })
      .catch(err => console.log(err));
  }

  // handleGoogleAuth = () => {
  //   axios
  //     .get('http://localhost:8080/auth/google')
  //     .then(() => {
  //       console.log('authenticed with Google!');
  //       this.setState({ isLoggedIn: true });
  //     })
  //     .catch(err => console.log(err));
  // };

  render () {
    const isLoggedIn = this.state.isLoggedIn;

    return (
      <div>
        {!isLoggedIn ? (
          <form onSubmit={this.handleLogin} name="login">
            <Input name="email" label="Email" type="text" />
            <Input name="password" label="Password" type="password" />
            <Button type="submit">Login</Button>
            {/*<a onClick={this.handleGoogleAuth}>Login with Google</a>*/}
          </form>
        ) : (
          <form onSubmit={this.handleLogout} name="logout">
            <Button type="submit">Logout</Button>
          </form>
        )}
      </div>
    );
  }
}

export default hot(module)(AuthForm);
