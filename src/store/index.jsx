import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import reducers from './reducers';
import history from '../routes/history';


const middlewares = [
  routerMiddleware(history),
  thunk,
];


export default createStore(
  reducers,
  applyMiddleware(...middlewares),
);
