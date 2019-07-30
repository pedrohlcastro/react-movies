import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import movies from './movies';
import history from '../../routes/history';


export default combineReducers({
  movies,
  router: connectRouter(history),
});
