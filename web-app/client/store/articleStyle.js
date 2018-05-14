import axios from 'axios';

// default styles for the page
const initialState = {
  fontSize: '1.1em'
};

/**
 * ACTION TYPES
 */
const INCREASE_FONT_SIZE = 'INCREASE_FONT_SIZE';
const DECREASE_FONT_SIZE = 'DECREASE_FONT_SIZE';
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

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case INCREASE_FONT_SIZE:
      return { ...state, fontSize: incFontSize(state.fontSize) };
    case DECREASE_FONT_SIZE:
      return { ...state, fontSize: decFontSize(state.fontSize) };
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
