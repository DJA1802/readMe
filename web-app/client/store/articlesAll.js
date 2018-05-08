import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ALL_ARTICLES = 'GET_ALL_ARTICLES';

/**
 * ACTION CREATORS
 */
const getAllArticles = articles => ({ type: GET_ALL_ARTICLES, articles });

export const fetchAllArticles = () => dispatch =>
  axios
    .get('/api/articles')
    .then(res => dispatch(getAllArticles(res.data)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */

export default function (state = [], action) {
  switch (action.type) {
    case GET_ALL_ARTICLES:
      return action.articles;
    default:
      return state;
  }
}
