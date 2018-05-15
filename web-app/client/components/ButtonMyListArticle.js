import React from 'react';
import { connect } from 'react-redux';
import { putArticleStatus } from '../store';
import { ButtonIcon } from '.';

/**
 * COMPONENT
 */

const ButtonAddToMyListArticle = props => {
  const { articleId, handleAddToMyListArticle } = props;

  return (
    <ButtonIcon
      articleId={articleId}
      handleButtonClick={handleAddToMyListArticle}
      iconName="newspaper"
      popupLabel="My List"
      successMessage="Article added back to reading list"
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    handleAddToMyListArticle: articleId => {
      dispatch(putArticleStatus(articleId, 'my-list'));
    }
  };
};

export default connect(null, mapDispatchToProps)(ButtonAddToMyListArticle);
