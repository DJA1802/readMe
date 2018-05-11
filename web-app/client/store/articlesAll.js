import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ALL_ARTICLES = 'GET_ALL_ARTICLES';
const ADD_NEW_ARTICLE = 'ADD_NEW_ARTICLE';

/**
 * ACTION CREATORS
 */
const getAllArticles = articles => ({ type: GET_ALL_ARTICLES, articles });
const addNewArticle = article => ({ type: ADD_NEW_ARTICLE, article });

/**
 * THUNKS
 */
export const fetchAllArticles = () => dispatch =>
  axios
    .get('/api/articles')
    .then(res => dispatch(getAllArticles(res.data)))
    .catch(err => console.log(err));

export const postNewArticle = articleUrl => dispatch =>
  axios
    .post('/api/articles', { articleUrl })
    .then(res => dispatch(addNewArticle(res.data)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */

export default function (state = [], action) {
  switch (action.type) {
    case GET_ALL_ARTICLES:
      return action.articles;
    case ADD_NEW_ARTICLE:
      return [...state, action.article];
    default:
      return state;
  }
}
