import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_INTERACTIONS = 'GET_INTERACTIONS';

/**
 * ACTION CREATORS
 */
const getInteractions = interactions => ({
  type: GET_INTERACTIONS,
  interactions
});

/**
 * THUNK CREATORS
 */
export const fetchInteractions = () => dispatch =>
  axios
    .get(`/api/interactions`)
    .then(res => dispatch(getInteractions(res.data)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_INTERACTIONS:
      return action.interactions;
    default:
      return state;
  }
}
