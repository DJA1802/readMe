import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import articlesArchive from './articlesArchive';
import articlesMyList from './articlesMyList';
import articleSelected from './articleSelected';
import navbar from './navbar';
import user from './user';

const reducer = combineReducers({
  articlesArchive,
  articlesMyList,
  articleSelected,
  navbar,
  user
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './articlesArchive';
export * from './articlesMyList';
export * from './articleSelected';
export * from './navbar';
export * from './user';
