import React from 'react';
import { connect } from 'react-redux';
import { Button, Header, Input } from 'semantic-ui-react';
import { postNewArticle } from '../store';

/**
 * COMPONENT
 */

// TODO -- add form validations

const FormAddArticle = ({ handleSubmit }) => {
  return (
    <div id="add-form">
      <Header as="h4">Save an Article</Header>
      <p>Download the Chrome extension for easier saving</p>
      <form onSubmit={handleSubmit} name="add-form">
        <Input name="url" type="text" placeholder="http://..." />
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit: evt => {
      evt.preventDefault();
      dispatch(postNewArticle(evt.target.url.value));
      ownProps.handleClose();
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormAddArticle);
