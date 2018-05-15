const initialState = {
  direction: 'none',
  pixelsPassed: 0,
  hideNavbar: function () {
    return this.direction === 'down' && this.pixelsPassed > 50;
  }
};

/**
 * ACTION TYPES
 */
const UPDATE_PAGE_SCROLL = 'UPDATE_PAGE_SCROLL';
const CLEAR_SCROLL_DATA = 'CLEAR_SCROLL_DATA';

/**
 * ACTION CREATORS
 */
export const updatePageScroll = scrollData => ({
  type: UPDATE_PAGE_SCROLL,
  scrollData
});

export const clearScrollData = () => ({
  type: CLEAR_SCROLL_DATA
});

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_PAGE_SCROLL:
      return { ...state, ...action.scrollData };
    case CLEAR_SCROLL_DATA:
      return initialState;
    default:
      return state;
  }
}
