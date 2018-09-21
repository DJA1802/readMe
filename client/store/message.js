const initialState = {
  messageContent: '',
  visible: false
};

/**
 * ACTION TYPES
 */
const SHOW_MESSAGE = 'SHOW_MESSAGE';
const HIDE_MESSAGE = 'HIDE_MESSAGE';

/**
 * ACTION CREATORS
 */
const showMessage = messageContent => ({
  type: SHOW_MESSAGE,
  messageContent
});

const hideMessage = () => ({
  type: HIDE_MESSAGE
});

/**
 * THUNK CREATORS
 */
// (is this technically a thunk if there's no async call?)

export const message = messageContent => dispatch => {
  dispatch(showMessage(messageContent));
  setTimeout(() => dispatch(hideMessage()), 2000);
};

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_MESSAGE:
      return { messageContent: action.messageContent, visible: true };
    case HIDE_MESSAGE:
      return initialState;
    default:
      return state;
  }
}
