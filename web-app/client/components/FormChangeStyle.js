/*eslint-disable complexity*/

import React from 'react';
import { connect } from 'react-redux';
import { Icon, Segment } from 'semantic-ui-react';
import {
  increaseFontSize,
  decreaseFontSize,
  increaseLineHeight,
  decreaseLineHeight,
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
    handleDecLineHeight,
    handleIncLineHeight,
    handleTypeface,
    scheme
  } = props;

  return (
    <div id="style-form">
      <Segment.Group horizontal>
        <Segment
          style={{
            cursor: scheme !== 'light' && 'pointer'
          }}
          className="scheme-picker"
          onClick={() => handleColorScheme()}
        >
          {scheme === 'light' && <Icon name="check" />}
        </Segment>
        <Segment
          style={{
            backgroundColor: 'rgb(248, 242, 226)',
            cursor: scheme !== 'sepia' && 'pointer'
          }}
          className="scheme-picker"
          onClick={() => handleColorScheme('sepia')}
        >
          {scheme === 'sepia' && <Icon name="check" />}
        </Segment>
        <Segment
          style={{
            backgroundColor: 'rgb(50, 50, 50)',
            cursor: scheme !== 'dark' && 'pointer'
          }}
          className="scheme-picker"
          onClick={() => handleColorScheme('dark')}
        >
          {scheme === 'dark' && <Icon name="check" inverted />}
        </Segment>
      </Segment.Group>
      <Segment.Group style={{ textAlign: 'center' }}>
        <Segment
          style={{
            fontFamily: 'Lora',
            cursor: fontFamily !== 'Lora' && 'pointer',
            backgroundColor: fontFamily === 'Lora' && 'rgb(245, 245, 245)'
          }}
          onClick={() => handleTypeface('Lora')}
          className="font-segment"
        >
          <div className="font-name">Lora</div>
          {fontFamily === 'Lora' && (
            <Icon name="check" className="font-check-icon" />
          )}
        </Segment>
        <Segment
          style={{
            fontFamily: 'Lato',
            cursor: fontFamily !== 'Lato' && 'pointer',
            backgroundColor: fontFamily === 'Lato' && 'rgb(245, 245, 245)'
          }}
          onClick={() => handleTypeface('Lato')}
          className="font-segment"
        >
          <div className="font-name">Lato</div>
          {fontFamily === 'Lato' && (
            <Icon name="check" className="font-check-icon" />
          )}
        </Segment>
        <Segment
          style={{
            fontFamily: 'Helvetica',
            cursor: fontFamily !== 'Helvetica' && 'pointer',
            backgroundColor: fontFamily === 'Helvetica' && 'rgb(245, 245, 245)'
          }}
          onClick={() => handleTypeface('Helvetica')}
          className="font-segment"
        >
          <div className="font-name">Helvetica</div>
          {fontFamily === 'Helvetica' && (
            <Icon name="check" className="font-check-icon" />
          )}
        </Segment>
        <Segment
          style={{
            fontFamily: 'Georgia',
            cursor: fontFamily !== 'Georgia' && 'pointer',
            backgroundColor: fontFamily === 'Georgia' && 'rgb(245, 245, 245)'
          }}
          onClick={() => handleTypeface('Georgia')}
          className="font-segment"
        >
          <div className="font-name">Georgia</div>
          {fontFamily === 'Georgia' && (
            <Icon name="check" className="font-check-icon" />
          )}
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
        <Icon name="font" size="large" style={{ flex: 1 }} />
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
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <Segment
          circular
          style={{ padding: 0, flex: 2, margin: 0, cursor: 'pointer' }}
          onClick={handleDecLineHeight}
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
        <Icon
          name="content"
          size="large"
          style={{ flex: 1, margin: 0, left: '11px', position: 'relative' }}
        />
        <Icon
          name="resize vertical"
          size="large"
          style={{ flex: 1, margin: 0, position: 'relative' }}
        />
        <Segment
          circular
          style={{ padding: 0, flex: 2, margin: 0, cursor: 'pointer' }}
          onClick={handleIncLineHeight}
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
    handleIncLineHeight: () => {
      dispatch(increaseLineHeight());
    },
    handleDecLineHeight: () => {
      dispatch(decreaseLineHeight());
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
