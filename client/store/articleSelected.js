import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ARTICLE_ID = 'GET_ARTICLE_ID';
const CLEAR_ARTICLE = 'CLEAR_ARTICLE';

/**
 * ACTION CREATORS
 */
export const getArticle = articleId => ({ type: GET_ARTICLE_ID, articleId });
export const clearArticle = () => ({ type: CLEAR_ARTICLE });

/**
 * THUNK CREATORS
 */
// export const fetchArticle = articleId => dispatch =>
//   axios
//     .get(`/api/articles/${articleId}`)
//     .then(res => dispatch(getArticle(res.data)))
//     .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = null, action) {
  switch (action.type) {
    case GET_ARTICLE_ID:
      return action.articleId;
    case CLEAR_ARTICLE:
      return null;
    default:
      return state;
  }
}
