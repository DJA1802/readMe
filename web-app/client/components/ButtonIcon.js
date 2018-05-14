import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */

const ButtonIcon = props => {
  const { articleId, handleButtonClick, iconName, online, popupLabel } = props;
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
          onClick={online && (() => handleButtonClick(articleId))}
          link={online && true}
          className={!online && 'icon-disabled'}
        />
      }
      content={popupLabel}
    />
  );
};

const mapStateToProps = state => ({
  online: state.online
});

export default connect(mapStateToProps)(ButtonIcon);
