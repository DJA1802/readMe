import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import { message } from '../store';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */

const ButtonIcon = props => {
  const {
    articleId,
    handleButtonClick,
    handleMessage,
    iconName,
    online,
    popupLabel
  } = props;
  const style = {
    opacity: 0.7,
    padding: '0.5em'
  };

  return (
    <Popup
      style={style}
      size="mini"
      basic
      position="bottom center"
      trigger={
        <Icon
          name={iconName}
          size="large"
          onClick={
            online
              ? evt => {
                  handleButtonClick(articleId);
                  evt.preventDefault();
                }
              : evt => {
                  handleMessage('No Internet Connection');
                  evt.preventDefault();
                }
          }
          link={online && true}
          className={online ? 'icon-active' : 'icon-disabled'}
        />
      }
      content={popupLabel}
    />
  );
};

const mapStateToProps = state => ({
  online: state.online
});

const mapDispatchToProps = dispatch => ({
  handleMessage: messageContent => dispatch(message(messageContent))
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonIcon);
