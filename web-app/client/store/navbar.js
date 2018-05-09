const initialState = {
  visible: false
};

/**
 * ACTION TYPES
 */
const TOGGLE_MOBILE_SIDEBAR = 'TOGGLE_MOBILE_SIDEBAR';

/**
 * ACTION CREATORS
 */
export const toggleMobileSidebar = () => ({ type: TOGGLE_MOBILE_SIDEBAR });

/**
 * REDUCER
 */

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MOBILE_SIDEBAR:
      return { ...state, visible: !state.visible };
    default:
      return state;
  }
}
