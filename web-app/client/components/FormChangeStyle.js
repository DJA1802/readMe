import React from 'react';
import { connect } from 'react-redux';
import { Icon, Segment } from 'semantic-ui-react';
import { postNewArticle } from '../store';

/**
 * COMPONENT
 */

const FormChangeStyle = ({ handleSubmit }) => {
  return (
    <div id="style-form">
      <Segment.Group horizontal>
        <Segment />
        <Segment style={{ backgroundColor: 'rgb(248, 242, 226)' }} />
        <Segment style={{ backgroundColor: 'rgb(50, 50, 50)' }} />
      </Segment.Group>
      <Segment.Group style={{ textAlign: 'center' }}>
        <Segment style={{ fontFamily: 'Lyon' }}>Lyon</Segment>
        <Segment style={{ fontFamily: 'Lato' }}>Lato</Segment>
        <Segment style={{ fontFamily: 'Helvetia' }}>Helvetica</Segment>
        <Segment style={{ fontFamily: 'Georgia' }}>Georgia</Segment>
      </Segment.Group>
      <div style={{ display: 'flex' }}>
        <Segment circular style={{ padding: 0, flex: 1, margin: 0 }}>
          <Icon
            name="minus"
            size="small"
            style={{
              paddingTop: '8px',
              margin: 0
            }}
          />
        </Segment>
        <Icon name="font" style={{ flex: 1 }} />
        <Segment circular style={{ padding: 0, flex: 1, margin: 0 }}>
          <Icon
            name="plus"
            size="small"
            style={{
              paddingTop: '8px',
              margin: 0
            }}
          />
        </Segment>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FormChangeStyle);
