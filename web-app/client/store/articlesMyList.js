import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_MYLIST_ARTICLES = 'GET_MYLIST_ARTICLES';
const ADD_NEW_ARTICLE = 'ADD_NEW_ARTICLE';

/**
 * ACTION CREATORS
 */
const getMyListArticles = articles => ({ type: GET_MYLIST_ARTICLES, articles });
const addNewArticle = article => ({ type: ADD_NEW_ARTICLE, article });

/**
 * THUNKS
 */
export const fetchMyListArticles = () => dispatch =>
  axios
    .get('/api/articles?status=my-list')
    .then(res => dispatch(getMyListArticles(res.data)))
    .catch(err => console.log(err));

export const postNewArticle = articleUrl => dispatch => {
  history.push('/home');
  axios
    .post('/api/articles', { articleUrl })
    .then(res => {
      dispatch(addNewArticle(res.data));
    })
    .catch(err => console.log(err));
};

/**
 * REDUCER
 */

export default function (state = [], action) {
  switch (action.type) {
    case GET_MYLIST_ARTICLES:
      return action.articles;
    case ADD_NEW_ARTICLE:
      return [...state, action.article];
    default:
      return state;
  }
}
