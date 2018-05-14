import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Segment } from 'semantic-ui-react';
import { increaseFontSize, decreaseFontSize } from '../store';

/**
 * COMPONENT
 */

class FormChangeStyle extends Component {
  handleTypeface = typeface => {
    document.getElementById('single-article').style.fontFamily = typeface;
  };

  render () {
    const { handleTypeface } = this;
    const { handleIncFont, handleDecFont } = this.props;

    return (
      <div id="style-form">
        <Segment.Group horizontal>
          <Segment />
          <Segment style={{ backgroundColor: 'rgb(248, 242, 226)' }} />
          <Segment style={{ backgroundColor: 'rgb(50, 50, 50)' }} />
        </Segment.Group>
        <Segment.Group style={{ textAlign: 'center' }}>
          <Segment
            style={{ fontFamily: 'Lora', cursor: 'pointer' }}
            onClick={() => handleTypeface('Lora')}
          >
            Lora
          </Segment>
          <Segment
            style={{ fontFamily: 'Lato', cursor: 'pointer' }}
            onClick={() => handleTypeface('Lato')}
          >
            Lato
          </Segment>
          <Segment
            style={{ fontFamily: 'Helvetica', cursor: 'pointer' }}
            onClick={() => handleTypeface('Helvetica')}
          >
            Helvetica
          </Segment>
          <Segment
            style={{ fontFamily: 'Georgia', cursor: 'pointer' }}
            onClick={() => handleTypeface('Georgia')}
          >
            Georgia
          </Segment>
        </Segment.Group>
        <div style={{ display: 'flex' }}>
          <Segment
            circular
            style={{ padding: 0, flex: 1, margin: 0, cursor: 'pointer' }}
            onClick={handleDecFont}
          >
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
          <Segment
            circular
            style={{ padding: 0, flex: 1, margin: 0, cursor: 'pointer' }}
            onClick={handleIncFont}
          >
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
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    fontSize: state.articleStyle.fontSize
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleIncFont: () => {
      dispatch(increaseFontSize());
    },
    handleDecFont: () => {
      dispatch(decreaseFontSize());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormChangeStyle);
