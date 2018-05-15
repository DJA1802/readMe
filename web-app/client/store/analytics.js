import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_FIRST_INTERACTION = 'GET_FIRST_INTERACTION';
const GET_READING_HOURS = 'GET_READING_HOURS';

/**
 * ACTION CREATORS
 */
const getFirstInteraction = interactionTime => ({
  type: GET_FIRST_INTERACTION,
  interactionTime
});

const getReadingHours = readingHours => ({
  type: GET_READING_HOURS,
  readingHours
});

/**
 * THUNK CREATORS
 */
export const fetchFirstInteraction = () => dispatch =>
  axios
    .get(`/api/interactions/first`)
    .then(res => {
      dispatch(getFirstInteraction(res.data));
    })
    .catch(err => console.log(err));

export const fetchReadingHours = () => dispatch =>
  axios
    .get(`/api/interactions/hours`)
    .then(res => {
      dispatch(getReadingHours(res.data));
    })
    .catch(err => console.log(err));
/**
 * REDUCER
 */

const initialState = {
  firstEverInteraction: '',
  readingHours: [] // { hour: INT, interactionCount: INT }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FIRST_INTERACTION:
      return Object.assign({}, initialState, {
        firstEverInteraction: action.interactionTime
      });
    case GET_READING_HOURS:
      return Object.assign({}, initialState, {
        readingHours: action.readingHours
      });
    default:
      return state;
  }
}
