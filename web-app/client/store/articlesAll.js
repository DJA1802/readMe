import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ARTICLES = 'GET_ARTICLES';
const ADD_ARTICLE = 'ADD_ARTICLE';
const REMOVE_ARTICLE = 'REMOVE_ARTICLE';

/**
 * ACTION CREATORS
 */
const getArticles = articles => ({ type: GET_ARTICLES, articles });
const addArticle = article => ({ type: ADD_ARTICLE, article });
const removeArticle = articleId => ({ type: REMOVE_ARTICLE, articleId });

/**
 * THUNKS
 */
export const fetchArticles = () => dispatch =>
  axios
    .get('/api/articles')
    .then(res => dispatch(getArticles(res.data)))
    .catch(err => console.log(err));

export const postNewArticle = articleUrl => dispatch => {
  history.push('/home');
  axios
    .post('/api/articles', { articleUrl })
    .then(res => dispatch(addArticle(res.data)))
    .catch(err => console.log(err));
};

export const deleteArticle = articleId => dispatch => {
  axios
    .delete(`/api/articles/${articleId}`)
    .then(res => {
      if (res.status === 204) {
        dispatch(removeArticle(articleId));
      } else {
        throw new Error('no articles were deleted');
      }
    })
    .catch(err => console.log(err));
};

/**
 * REDUCER
 */

export default function (state = [], action) {
  switch (action.type) {
    case GET_ARTICLES:
      return action.articles;
    case ADD_ARTICLE:
      return [...state, action.article];
    case REMOVE_ARTICLE:
      return state.filter(article => article.id !== action.articleId);
    default:
      return state;
  }
}