import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ARTICLE = 'GET_ARTICLE';
const CLEAR_ARTICLE = 'CLEAR_ARTICLE';

/**
 * ACTION CREATORS
 */
const getArticle = article => ({ type: GET_ARTICLE, article });
export const clearArticle = () => ({ type: CLEAR_ARTICLE });

/**
 * THUNK CREATORS
 */
export const fetchArticle = articleId => dispatch =>
  axios
    .get(`/api/articles/${articleId}`)
    .then(res => dispatch(getArticle(res.data)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GET_ARTICLE:
      return action.article;
    case CLEAR_ARTICLE:
      return {};
    default:
      return state;
  }
}
