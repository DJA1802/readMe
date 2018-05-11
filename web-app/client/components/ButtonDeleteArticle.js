import React from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { deleteArticle } from '../store';

/**
 * COMPONENT
 */

const ButtonDeleteArticle = props => {
  const { articleId, handleDeleteArticle } = props;
  return (
    <Icon
      size="large"
      name="trash outline"
      onClick={() => handleDeleteArticle(articleId)}
      link
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    handleDeleteArticle: articleId => dispatch(deleteArticle(articleId))
  };
};

export default connect(null, mapDispatchToProps)(ButtonDeleteArticle);
