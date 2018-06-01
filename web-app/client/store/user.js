import axios from 'axios';
import history from '../history';
import { fetchArticles, postNewArticle } from '../store';
import { clearLocalInteractions } from '../utils/helperFuncs';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const POST_CACHED_INTERACTIONS = 'POST_CACHED_INTERACTIONS';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const acPostCachedInteractions = () => ({ type: POST_CACHED_INTERACTIONS });

/**
 * THUNK CREATORS
 */
export const me = () => dispatch =>
  axios
    .get('/auth/me')
    .then(res => dispatch(getUser(res.data || defaultUser)))
    .catch(err => console.log(err));

export const auth = (email, password, method) => dispatch =>
  axios
    .post(`/auth/${method}`, { email, password })
    .then(
      res => {
        dispatch(getUser(res.data));
        dispatch(fetchArticles());
        history.push('/home');
      },
      authError => {
        // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }));
      }
    )
    .then(() => {
      if (method === 'signup') {
        // create default articles for a new user
        dispatch(
          postNewArticle(
            'https://www.theonion.com/bath-body-works-now-offering-free-lotion-tastings-1826075615'
          )
        );
        dispatch(
          postNewArticle(
            'https://www.newyorker.com/culture/annals-of-gastronomy/where-are-we-on-hating-brunch'
          )
        );
        dispatch(
          postNewArticle(
            'https://www.smithsonianmag.com/science-nature/moral-cost-of-cats-180960505/'
          )
        );
      }
    })
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr));

export const logout = () => dispatch =>
  axios
    .post('/auth/logout')
    .then(_ => {
      dispatch(removeUser());
      history.push('/');
    })
    .catch(err => console.log(err));

export const postCachedInteractions = interactions => dispatch =>
  axios
    .post('/api/interactions', interactions)
    .then(_ => {
      dispatch(acPostCachedInteractions());
      clearLocalInteractions();
    })
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
