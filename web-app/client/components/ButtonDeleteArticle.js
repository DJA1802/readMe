import React from 'react';
import { Icon } from 'semantic-ui-react';

/**
 * COMPONENT
 */

const ButtonDeleteArticle = () => {
  return (
    <Icon
      size="large"
      name="trash outline"
      onClick={() => console.log('click')}
      link
    />
  );
};

export default ButtonDeleteArticle;
