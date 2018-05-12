import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';

/**
 * COMPONENT
 */

const ButtonIcon = props => {
  const { articleId, handleButtonClick, iconName, popupLabel } = props;
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
          onClick={() => handleButtonClick(articleId)}
          link
        />
      }
      content={popupLabel}
    />
  );
};

export default ButtonIcon;
