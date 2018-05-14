/*eslint-disable complexity*/

import React from 'react';
import { connect } from 'react-redux';
import { Icon, Segment } from 'semantic-ui-react';
import {
  increaseFontSize,
  decreaseFontSize,
  updateColorScheme,
  updateFontFamily
} from '../store';

/**
 * COMPONENT
 */

const FormChangeStyle = props => {
  const {
    fontFamily,
    handleColorScheme,
    handleDecFont,
    handleIncFont,
    handleTypeface,
    scheme
  } = props;

  return (
    <div id="style-form">
      <Segment.Group horizontal>
        <Segment
          style={{ cursor: scheme !== 'light' && 'pointer' }}
          onClick={() => handleColorScheme()}
        />
        <Segment
          style={{
            backgroundColor: 'rgb(248, 242, 226)',
            cursor: scheme !== 'sepia' && 'pointer'
          }}
          onClick={() => handleColorScheme('sepia')}
        />
        <Segment
          style={{
            backgroundColor: 'rgb(50, 50, 50)',
            cursor: scheme !== 'dark' && 'pointer'
          }}
          onClick={() => handleColorScheme('dark')}
        />
      </Segment.Group>
      <Segment.Group style={{ textAlign: 'center' }}>
        <Segment
          style={{
            fontFamily: 'Lora',
            cursor: fontFamily !== 'Lora' && 'pointer',
            backgroundColor: fontFamily === 'Lora' && 'rgb(245, 245, 245)'
          }}
          onClick={() => handleTypeface('Lora')}
        >
          Lora
        </Segment>
        <Segment
          style={{
            fontFamily: 'Lato',
            cursor: fontFamily !== 'Lato' && 'pointer',
            backgroundColor: fontFamily === 'Lato' && 'rgb(245, 245, 245)'
          }}
          onClick={() => handleTypeface('Lato')}
        >
          Lato
        </Segment>
        <Segment
          style={{
            fontFamily: 'Helvetica',
            cursor: fontFamily !== 'Helvetica' && 'pointer',
            backgroundColor: fontFamily === 'Helvetica' && 'rgb(245, 245, 245)'
          }}
          onClick={() => handleTypeface('Helvetica')}
        >
          Helvetica
        </Segment>
        <Segment
          style={{
            fontFamily: 'Georgia',
            cursor: fontFamily !== 'Georgia' && 'pointer',
            backgroundColor: fontFamily === 'Georgia' && 'rgb(245, 245, 245)'
          }}
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
};

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    fontSize: state.articleStyle.fontSize,
    fontFamily: state.articleStyle.fontFamily,
    scheme: state.articleStyle.scheme
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleIncFont: () => {
      dispatch(increaseFontSize());
    },
    handleDecFont: () => {
      dispatch(decreaseFontSize());
    },
    handleTypeface: fontFamily => {
      dispatch(updateFontFamily(fontFamily));
    },
    handleColorScheme: colorScheme => {
      dispatch(updateColorScheme(colorScheme));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormChangeStyle);
