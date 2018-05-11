import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ARCHIVE_ARTICLES = 'GET_ARCHIVE_ARTICLES';

/**
 * ACTION CREATORS
 */
const getArchiveArticles = articles => ({
  type: GET_ARCHIVE_ARTICLES,
  articles
});

/**
 * THUNKS
 */
export const fetchArchiveArticles = () => dispatch =>
  axios
    .get('/api/articles?status=archive')
    .then(res => dispatch(getArchiveArticles(res.data)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */

export default function (state = [], action) {
  switch (action.type) {
    case GET_ARCHIVE_ARTICLES:
      return action.articles;
    default:
      return state;
  }
}
