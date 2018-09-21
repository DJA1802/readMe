import React, { Component } from 'react';
import { Icon, Menu, Popup } from 'semantic-ui-react';
import { FormAddArticle } from '../../../components';
import { message } from '../../../store';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
class ButtonAddArticle extends Component {
  state = { isOpen: false };

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render () {
    const { online, handleMessage } = this.props;
    return online ? (
      <Popup
        trigger={
          <Menu.Item>
            <Icon className="no-margin" name="plus" size="large" />
          </Menu.Item>
        }
        on="click"
        open={this.state.isOpen}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        position="bottom right"
      >
        <Popup.Content>
          <FormAddArticle handleClose={this.handleClose} />
        </Popup.Content>
      </Popup>
    ) : (
      <Menu.Item>
        <Icon
          className="no-margin"
          name="plus"
          size="large"
          onClick={() => handleMessage('No Internet Connection')}
        />
      </Menu.Item>
    );
  }
}

const mapStateToProps = state => ({
  online: state.online
});

const mapDispatchToProps = dispatch => ({
  handleMessage: messageContent => dispatch(message(messageContent))
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAddArticle);
