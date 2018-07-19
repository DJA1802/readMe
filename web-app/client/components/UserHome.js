import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { deleteUser } from '../store';

/**
 * COMPONENT
 */
export const UserHome = props => {
  const { email, handleDeleteUser } = props;

  return (
    <div>
      <h3>Account email: {email}</h3>
      <Button color="red" onClick={handleDeleteUser}>
        Delete account
      </Button>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  };
};

const mapDispatch = dispatch => {
  return {
    handleDeleteUser: () => {
      if (confirm('Are you sure you want to delete your account?')) {
        dispatch(deleteUser());
      }
    }
  };
};

export default connect(mapState, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
