import React, { Component } from 'react';
import { Icon, Menu, Popup } from 'semantic-ui-react';
import { logout } from '../store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { desktop } from '../utils/constants';

/**
 * COMPONENT
 */
const UserIcon = () => (
  <Icon className="no-margin" fitted name="user circle outline" size="big" />
);

class ButtonAddArticle extends Component {
  state = { isOpen: false };

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render () {
    const { handleLogoutClick } = this.props;
    return (
      <React.Fragment>
        <MediaQuery maxWidth={desktop}>
          {matches => {
            if (matches) {
              return (
                <Popup
                  trigger={
                    <Menu.Item id="navbar-user-mobile">
                      <UserIcon />
                      <Icon name="triangle down" />
                    </Menu.Item>
                  }
                  on="click"
                  open={this.state.isOpen}
                  onClose={this.handleClose}
                  onOpen={this.handleOpen}
                  position="bottom right"
                >
                  <Popup.Content as={Menu} vertical>
                    <Menu.Item
                      name="user-home"
                      as={Link}
                      to="/user-home"
                      onClick={() => {
                        this.handleClose();
                      }}
                    >
                      User Home
                    </Menu.Item>
                    <Menu.Item
                      name="logout"
                      onClick={() => {
                        this.handleClose();
                        handleLogoutClick();
                      }}
                      as={Link}
                      to="#"
                    >
                      Logout
                    </Menu.Item>
                  </Popup.Content>
                </Popup>
              );
            } else {
              return (
                <Menu.Item>
                  <UserIcon />
                </Menu.Item>
              );
            }
          }}
        </MediaQuery>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  online: state.online
});

const mapDispatchToProps = dispatch => ({
  handleLogoutClick: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAddArticle);
