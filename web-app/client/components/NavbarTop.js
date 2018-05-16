import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, toggleMobileSidebar } from '../store';
import { Dropdown, Icon, Menu, Transition } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import { desktop } from '../utils/constants';
import { ButtonAddArticle, ButtonChangeStyle, ButtonUserIcon } from '.';

const NavbarTop = props => {
  const {
    isArticleView,
    email,
    handleLogoutClick,
    isLoggedIn,
    handleMenuClick,
    hideNavbar
  } = props;

  return (
    <Transition visible={!hideNavbar} animation="fade" duration={700}>
      <div>
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
                  <Menu.Item header as={Link} to="/home" id="navbar-title">
                    readMe
                  </Menu.Item>
                );
              }
            }}
          </MediaQuery>
          {isLoggedIn ? (
            <Menu.Menu position="right">
              {isArticleView ? <ButtonChangeStyle /> : <ButtonAddArticle />}
              <ButtonUserIcon />
              <MediaQuery minWidth={desktop}>
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
              </MediaQuery>
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
      </div>
    </Transition>
  );
};

/**
 * CONTAINER
 */
const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id,
  email: state.user.email,
  isArticleView: !!state.articleSelected,
  hideNavbar: state.pageScroll.hideNavbar()
});

const mapDispatchToProps = dispatch => ({
  handleLogoutClick: () => dispatch(logout()),
  handleMenuClick: () => dispatch(toggleMobileSidebar())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarTop);

/**
 * PROP TYPES
 */
NavbarTop.propTypes = {
  handleLogoutClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
