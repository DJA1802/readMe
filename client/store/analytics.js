import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_FIRST_INTERACTION = 'GET_FIRST_INTERACTION';
const GET_READING_HOURS = 'GET_READING_HOURS';
const GET_PUB_COUNTS = 'GET_PUB_COUNTS';
const GET_ZOOM = 'GET_ZOOM';
const CHANGE_ZOOM = 'CHANGE_ZOOM';
const GET_HOME_PAGE_STATS = 'GET_HOME_PAGE_STATS';
const GET_ARTICLE_STATS_BY_DURATION = 'GET_ARTICLE_STATS_BY_DURATION';
const GET_ARTICLE_STATS_BY_INTERACTION = 'GET_ARTICLE_STATS_BY_INTERACTION';

/**
 * ACTION CREATORS
 */
const getFirstInteraction = interactionTime => ({
  type: GET_FIRST_INTERACTION,
  interactionTime
});

const getReadingHours = readingHours => ({
  type: GET_READING_HOURS,
  readingHours
});

export const getZoom = firstInteractionDate => ({
  type: GET_ZOOM,
  firstInteractionDate
});

export const changeZoom = domain => ({
  type: CHANGE_ZOOM,
  domain
});

export const getPubCounts = pubs => ({
  type: GET_PUB_COUNTS,
  pubs
});

export const getHomePageStats = homePageStats => ({
  type: GET_HOME_PAGE_STATS,
  homePageStats
});

export const getArticleStatsByDuration = articlesByDuration => ({
  type: GET_ARTICLE_STATS_BY_DURATION,
  articlesByDuration
});

export const getArticleStatsByInteraction = articlesByInteraction => ({
  type: GET_ARTICLE_STATS_BY_INTERACTION,
  articlesByInteraction
});

/**
 * THUNK CREATORS
 */
export const fetchFirstInteraction = () => dispatch =>
  axios
    .get(`/api/interactions/first`)
    .then(res => {
      dispatch(getFirstInteraction(res.data));
    })
    .catch(err => console.log(err));

export const fetchReadingHours = () => dispatch =>
  axios
    .get(`/api/interactions/hours`)
    .then(res => {
      dispatch(getReadingHours(res.data));
    })
    .catch(err => console.log(err));

export const fetchPubCounts = () => dispatch =>
  axios
    .get(`api/interactions/pubs`)
    .then(res => {
      dispatch(getPubCounts(res.data));
    })
    .catch(err => console.log(err));

export const fetchHomePageStats = () => dispatch =>
  axios
    .get(`/api/users/homePageStats`)
    .then(res => {
      dispatch(getHomePageStats(res.data));
    })
    .catch(err => console.log(err));

export const fetchArticleStatsByDuration = () => dispatch =>
  axios
    .get(`/api/articles/mostReadByDuration`)
    .then(res => {
      dispatch(getArticleStatsByDuration(res.data));
    })
    .catch(err => console.log(err));

export const fetchArticleStatsByInteraction = () => dispatch =>
  axios
    .get(`/api/articles/mostReadByInteraction`)
    .then(res => {
      dispatch(getArticleStatsByInteraction(res.data));
    })
    .catch(err => console.log(err));

/**
 * REDUCER
 */
const initialState = {
  firstEverInteraction: '',
  readingHours: [],
  zoom: {},
  pubCounts: [],
  homePageStats: [],
  articlesByDuration: [],
  articlesByInteraction: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FIRST_INTERACTION:
      return { ...state, firstEverInteraction: action.interactionTime };
    case GET_READING_HOURS:
      return { ...state, readingHours: action.readingHours };
    case GET_ZOOM:
      return {
        ...state,
        zoom: { x: [action.firstInteractionDate, Date.now()] }
      };
    case CHANGE_ZOOM:
      return { ...state, zoom: action.domain };
    case GET_PUB_COUNTS:
      return { ...state, pubCounts: action.pubs };
    case GET_HOME_PAGE_STATS:
      return { ...state, homePageStats: action.homePageStats };
    case GET_ARTICLE_STATS_BY_DURATION:
      return { ...state, articlesByDuration: action.articlesByDuration };
    case GET_ARTICLE_STATS_BY_INTERACTION:
      return { ...state, articlesByInteraction: action.articlesByInteraction };
    default:
      return state;
  }
}
