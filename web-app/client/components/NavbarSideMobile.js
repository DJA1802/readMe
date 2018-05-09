import React from 'react';
import { Menu, Sidebar } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavbarSideItems } from '.';
import { desktop } from '../utils/constants';
import { toggleMobileSidebar } from '../store';

const NavbarSideMobile = ({ handleMenuClick, visible }) => {
  return (
    <React.Fragment>
      <MediaQuery maxWidth={desktop}>
        <Sidebar as={Menu} animation="overlay" visible={visible} vertical>
          <Menu.Item as={Link} to="/home" onClick={handleMenuClick}>
            Home
          </Menu.Item>
          <NavbarSideItems />
        </Sidebar>
      </MediaQuery>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    visible: state.navbar.visible
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleMenuClick: () => dispatch(toggleMobileSidebar())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarSideMobile);
