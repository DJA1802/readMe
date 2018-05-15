import React from 'react';
import { connect } from 'react-redux';
import { putArticleStatus } from '../store';
import { ButtonIcon } from '.';

/**
 * COMPONENT
 */

const ButtonArchiveArticle = props => {
  const { articleId, handleAddToMyListArticle } = props;

  return (
    <ButtonIcon
      articleId={articleId}
      handleButtonClick={handleAddToMyListArticle}
      iconName="archive"
      popupLabel="Archive"
      successMessage="Article archived"
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    handleAddToMyListArticle: articleId => {
      dispatch(putArticleStatus(articleId, 'archive'));
    }
  };
};

export default connect(null, mapDispatchToProps)(ButtonArchiveArticle);
