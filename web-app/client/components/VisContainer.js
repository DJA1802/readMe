import React, { Component } from 'react';
import { Visibility } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { updatePageScroll, clearScrollData } from '../store';

class VisContainer extends Component {
  componentWillUnmount () {
    this.props.handleUnmount();
  }

  render () {
    const { children, handleUpdate } = this.props;
    return <Visibility onUpdate={handleUpdate}>{children}</Visibility>;
  }
}

const mapDispatchToProps = dispatch => ({
  handleUpdate: (e, { calculations }) => {
    const { direction, pixelsPassed } = calculations;
    dispatch(updatePageScroll({ direction, pixelsPassed }));
  },
  handleUnmount: () => dispatch(clearScrollData())
});

export default connect(null, mapDispatchToProps)(VisContainer);
