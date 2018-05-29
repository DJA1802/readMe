import React from 'react';
import { connect } from 'react-redux';
import { deleteArticle } from '../../../store';
import { ButtonIcon } from '.';

/**
 * COMPONENT
 */

const ButtonDeleteArticle = props => {
  const { articleId, handleDeleteArticle } = props;

  return (
    <ButtonIcon
      articleId={articleId}
      handleButtonClick={handleDeleteArticle}
      iconName="trash outline"
      popupLabel="Delete"
      successMessage="Article deleted"
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    handleDeleteArticle: articleId => {
      if (confirm('Are you sure you want to delete this article?')) {
        dispatch(deleteArticle(articleId));
      }
    }
  };
};

export default connect(null, mapDispatchToProps)(ButtonDeleteArticle);
