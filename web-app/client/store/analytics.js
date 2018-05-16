import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_FIRST_INTERACTION = 'GET_FIRST_INTERACTION';
const GET_READING_HOURS = 'GET_READING_HOURS';
const GET_ZOOM = 'GET_ZOOM';
const CHANGE_ZOOM = 'CHANGE_ZOOM';

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

export const getZoom = firstInteractionDate => ({
  type: GET_ZOOM,
  firstInteractionDate
});

export const changeZoom = domain => ({
  type: CHANGE_ZOOM,
  domain
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
  readingHours: [],
  zoom: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FIRST_INTERACTION:
      return { ...state, firstEverInteraction: action.interactionTime };
    case GET_READING_HOURS:
      return { ...state, readingHours: action.readingHours };
    case GET_ZOOM:
      return {
        ...state,
        zoom: { x: [action.firstInteractionDate, Date.now()] }
      };
    case CHANGE_ZOOM:
      return { ...state, zoom: action.domain };
    default:
      return state;
  }
}