import React from 'react';
import { Segment, Transition } from 'semantic-ui-react';
import { connect } from 'react-redux';

const Message = props => {
  const { visible, messageContent } = props;
  return (
    <Transition visible={visible} animation="fade down" duration={400}>
      <Segment id="message" as="h3">
        {messageContent}
      </Segment>
    </Transition>
  );
};

const mapStateToProps = state => ({
  messageContent: state.message.messageContent,
  visible: state.message.visible
});

export default connect(mapStateToProps)(Message);
