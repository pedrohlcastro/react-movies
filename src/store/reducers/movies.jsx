import { movieActions } from '../actions';


const INITIAL_STATE = {
  moviesData: [],
  activeMovie: -1,
  orderType: 'name',
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case movieActions.default.SET_CURRENT:
      return {
        ...state,
      };
    case movieActions.default.FETCH_MOVIES:
      return {
        ...state,
        moviesData: action.payload.moviesData,
        orderType: action.payload.orderType,
      };
    default:
      return state;
  }
};
