import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleMobileSidebar } from '../store';

const NavbarSideItems = ({ handleMenuClick }) => {
  return (
    <React.Fragment>
      <Menu.Item
        as={Link}
        to="/articles"
        onClick={handleMenuClick}
        className="navbar-side-item"
      >
        <Icon name="newspaper" className="left" size="large" />
        My List
      </Menu.Item>
      <Menu.Item
        as={Link}
        to="/analytics"
        onClick={handleMenuClick}
        className="navbar-side-item"
      >
        <Icon name="bar graph" className="left" size="large" />
        My Data
      </Menu.Item>
      <Menu.Item
        as={Link}
        to="/archive"
        onClick={handleMenuClick}
        className="navbar-side-item"
      >
        <Icon name="archive" className="left" size="large" />
        Archive
      </Menu.Item>
    </React.Fragment>
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
