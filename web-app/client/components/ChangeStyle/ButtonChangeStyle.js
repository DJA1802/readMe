import React, { Component } from 'react';
import { Icon, Menu, Popup } from 'semantic-ui-react';
import { FormChangeStyle } from '../../components';

/**
 * COMPONENT
 */
export default class ButtonAddArticle extends Component {
  state = { isOpen: false };

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render () {
    return (
      <Popup
        trigger={
          <Menu.Item>
            <Icon className="no-margin" name="font" size="large" />
          </Menu.Item>
        }
        on="click"
        open={this.state.isOpen}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        position="bottom right"
      >
        <Popup.Content>
          <FormChangeStyle handleClose={this.handleClose} />
        </Popup.Content>
      </Popup>
    );
  }
}
