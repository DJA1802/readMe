import React from 'react';
import { connect } from 'react-redux';
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

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ButtonArchiveArticle
);
