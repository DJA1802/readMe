import React from 'react';
import { Icon } from 'semantic-ui-react';

/**
 * COMPONENT
 */

const ButtonArchiveArticle = () => {
  return (
    <Icon
      name="archive"
      size="large"
      onClick={() => console.log('click')}
      link
    />
  );
};

export default ButtonArchiveArticle;
