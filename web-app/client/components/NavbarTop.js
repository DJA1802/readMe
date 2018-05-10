import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, toggleMobileSidebar } from '../store';
import { Dropdown, Icon, Menu, Popup } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import { desktop } from '../utils/constants';
import { AddForm } from '.';

const NavbarTop = ({
  email,
  handleLogoutClick,
  isLoggedIn,
  handleMenuClick
}) => {
  return (
    <Menu id="navbar-top">
      <MediaQuery maxWidth={desktop}>
        {matches => {
          if (matches && isLoggedIn) {
            return (
              <Menu.Item onClick={handleMenuClick}>
                <Icon name="content" size="large" />
              </Menu.Item>
            );
          } else {
            return (
              <Menu.Item header as={Link} to="/home">
                ReadMe
              </Menu.Item>
            );
          }
        }}
      </MediaQuery>
      {isLoggedIn ? (
        <Menu.Menu position="right">
          <Popup
            trigger={
              <Menu.Item>
                <Icon className="no-margin" name="plus" size="large" />
              </Menu.Item>
            }
            on="click"
            position="bottom right"
          >
            <Popup.Content>
              <AddForm />
            </Popup.Content>
          </Popup>
          <Menu.Item>
            <Icon
              className="no-margin"
              fitted
              name="user circle outline"
              size="big"
            />
          </Menu.Item>
          <Dropdown item text={email}>
            <Dropdown.Menu>
              <Dropdown.Item name="user-home" as={Link} to="/user-home">
                User Home
              </Dropdown.Item>
              <Dropdown.Item
                name="logout"
                onClick={handleLogoutClick}
                as={Link}
                to="#"
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      ) : (
        <React.Fragment>
          <Menu.Item name="signup" as={Link} to="/signup" />
          <Menu.Menu position="right">
            <Menu.Item name="login" as={Link} to="/login" />
          </Menu.Menu>
        </React.Fragment>
      )}
    </Menu>
  );
};

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    email: state.user.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogoutClick: () => dispatch(logout()),
    handleMenuClick: () => dispatch(toggleMobileSidebar())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarTop);

/**
 * PROP TYPES
 */
NavbarTop.propTypes = {
  handleLogoutClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
