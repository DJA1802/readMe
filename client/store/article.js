import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ALL_ARTICLES = 'GET_ALL_ARTICLES';
const GET_ARTICLE = 'GET_ARTICLE';

/**
 * ACTION CREATORS
 */
const getAllArticles = articles => ({type: GET_ALL_ARTICLES, articles});
const getArticle = article => ({type: GET_ARTICLE, article});

/**
 * THUNK CREATORS
 */
export const fetchAllArticles = () =>
  dispatch =>
    axios.get(`/api/articles`)
      .then(res =>
        dispatch(getAllArticles(res.data)))
      .catch(err => console.log(err));

export const fetchArticle = (articleId) =>
  dispatch =>
    axios.get(`/api/articles/${articleId}`)
      .then(res =>
        dispatch(getArticle(res.data)))
      .catch(err => console.log(err));
/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GET_ALL_ARTICLES:
      let newState = {};
      action.articles.forEach(article => {
        newState[article.id] = article;
      });
      return newState;

    case GET_ARTICLE:
      return {
        ...state,
        [action.article.id]: action.article
      };

    default:
      return state;
  }
}
