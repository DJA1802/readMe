import React from 'react';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
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
        <Sidebar
          as={Menu}
          animation="overlay"
          visible={visible}
          vertical
          id="nav-sidebar-mobile"
        >
          <Menu.Item
            as={Link}
            to="/home"
            onClick={handleMenuClick}
            className="navbar-side-item"
          >
            <Icon name="home" className="left" size="large" />
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
