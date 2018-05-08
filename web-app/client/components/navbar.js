import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { Menu } from 'semantic-ui-react';

const NavBar = ({ handleLogoutClick, isLoggedIn }) => (
  <Menu>
    <Menu.Item header>ReadMe</Menu.Item>
    {isLoggedIn ? (
      <React.Fragment>
        <Menu.Item name="articles" as={Link} to="/articles" />
        <Menu.Item name="logout" onClick={handleLogoutClick} as={Link} to="#" />
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Menu.Item name="login" as={Link} to="/login" />
        <Menu.Item name="signup" as={Link} to="/signup" />
      </React.Fragment>
    )}
  </Menu>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleLogoutClick () {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(NavBar);

/**
 * PROP TYPES
 */
NavBar.propTypes = {
  handleLogoutClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
