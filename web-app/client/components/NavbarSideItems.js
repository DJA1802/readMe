import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleMobileSidebar } from '../store';

const NavbarSideItems = ({ handleMenuClick }) => {
  return (
    <div>
      <Menu.Item as={Link} to="/articles" onClick={handleMenuClick}>
        <Icon name="newspaper" className="left" size="large" />
        My List
      </Menu.Item>
      <Menu.Item as={Link} to="/analytics" onClick={handleMenuClick}>
        <Icon name="bar graph" className="left" size="large" />
        My Data
      </Menu.Item>
      <Menu.Item as={Link} to="/archive" onClick={handleMenuClick}>
        <Icon name="archive" className="left" size="large" />
        Archive
      </Menu.Item>
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
