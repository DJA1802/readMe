// default styles for the page
const initialState = {
  fontSize: '1.2em',
  fontFamily: 'Lora',
  backgroundColor: 'white',
  color: 'black',
  scheme: 'light',
  lineHeight: '1.8em'
};

/**
 * ACTION TYPES
 */
const INCREASE_FONT_SIZE = 'INCREASE_FONT_SIZE';
const DECREASE_FONT_SIZE = 'DECREASE_FONT_SIZE';
const INCREASE_LINE_HEIGHT = 'INCREASE_LINE_HEIGHT';
const DECREASE_LINE_HEIGHT = 'DECREASE_LINE_HEIGHT';
const UPDATE_FONT_FAMILY = 'UPDATE_FONT_FAMILY';
const UPDATE_COLOR_SCHEME = 'UPDATE_COLOR_SCHEME';
const RESET_STYLES = 'RESET_STYLES';

/**
 * ACTION CREATORS
 */
export const increaseFontSize = () => ({
  type: INCREASE_FONT_SIZE
});

export const decreaseFontSize = () => ({
  type: DECREASE_FONT_SIZE
});

export const increaseLineHeight = () => ({
  type: INCREASE_LINE_HEIGHT
});

export const decreaseLineHeight = () => ({
  type: DECREASE_LINE_HEIGHT
});

export const updateFontFamily = fontFamily => ({
  type: UPDATE_FONT_FAMILY,
  fontFamily
});

export const updateColorScheme = colorScheme => ({
  type: UPDATE_COLOR_SCHEME,
  colorScheme
});

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case INCREASE_FONT_SIZE:
      return { ...state, fontSize: incFontSize(state.fontSize) };
    case DECREASE_FONT_SIZE:
      return { ...state, fontSize: decFontSize(state.fontSize) };
    case INCREASE_LINE_HEIGHT:
      return { ...state, lineHeight: incLineHeight(state.lineHeight) };
    case DECREASE_LINE_HEIGHT:
      return { ...state, lineHeight: decLineHeight(state.lineHeight) };
    case UPDATE_FONT_FAMILY:
      return { ...state, fontFamily: action.fontFamily };
    case UPDATE_COLOR_SCHEME:
      return { ...state, ...determineSchemeStyles(action.colorScheme) };
    case RESET_STYLES:
      return initialState;
    default:
      return state;
  }
}

// helpers

const incFontSize = currentFontSize => {
  let newFontSize = parseFloat(currentFontSize);
  if (newFontSize < 1.7) newFontSize += 0.1;
  return newFontSize.toString() + 'em';
};

const decFontSize = currentFontSize => {
  let newFontSize = parseFloat(currentFontSize);
  if (newFontSize > 0.8) newFontSize -= 0.1;
  return newFontSize.toString() + 'em';
};

const incLineHeight = currentLineHeight => {
  let newLineHeight = parseFloat(currentLineHeight);
  if (newLineHeight < 3) newLineHeight += 0.1;
  return newLineHeight.toString() + 'em';
};

const decLineHeight = currentLineHeight => {
  let newLineHeight = parseFloat(currentLineHeight);
  if (newLineHeight > 1) newLineHeight -= 0.1;
  return newLineHeight.toString() + 'em';
};

const determineSchemeStyles = colorScheme => {
  switch (colorScheme) {
    case 'sepia':
      return {
        backgroundColor: 'rgb(238, 232, 224)',
        color: 'rgb(34, 34, 34)',
        scheme: 'sepia'
      };
    case 'dark':
      return {
        backgroundColor: 'rgb(34, 34, 34)',
        color: 'rgb(230, 230, 230)',
        scheme: 'dark'
      };
    default:
      return { backgroundColor: 'white', color: 'black', scheme: 'light' };
  }
};
