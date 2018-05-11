import React from 'react';
import { Icon } from 'semantic-ui-react';

/**
 * COMPONENT
 */

const ButtonAddToMyListArticle = () => {
  return (
    <Icon
      name="newspaper"
      size="large"
      onClick={() => console.log('click')}
      link
    />
  );
};

export default ButtonAddToMyListArticle;
