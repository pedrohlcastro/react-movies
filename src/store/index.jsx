import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';

import reducers from './reducers';
import history from '../routes/history';


const middlewares = [
  routerMiddleware(history),
];


export default createStore(
  reducers,
  applyMiddleware(...middlewares),
);
