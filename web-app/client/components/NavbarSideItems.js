import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleMobileSidebar } from '../store';

const NavbarSideItems = ({ handleMenuClick }) => {
  return (
    <div>
      <Menu.Item as={Link} to="/articles" onClick={handleMenuClick}>
        My List
      </Menu.Item>
      <Menu.Item>Archive</Menu.Item>
      <Menu.Item>Analytics</Menu.Item>
    </div>
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
    handleMenuClick: () => dispatch(toggleMobileSidebar())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarSideItems);
