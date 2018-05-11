import React from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { putArticleStatus } from '../store';

/**
 * COMPONENT
 */

const ButtonArchiveArticle = props => {
  const { articleId, handleArchiveArticle } = props;

  return (
    <Icon
      name="archive"
      size="large"
      onClick={() => handleArchiveArticle(articleId)}
      link
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    handleArchiveArticle: articleId => {
      dispatch(putArticleStatus(articleId, 'archive'));
    }
  };
};

export default connect(null, mapDispatchToProps)(ButtonArchiveArticle);
