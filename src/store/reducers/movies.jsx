import { movieActions } from '../actions';


const INITIAL_STATE = {
  moviesData: [],
  isLoading: false,
  activeMovie: -1,
  orderType: '',
  movie: {
    Title: '',
    Poster: '',
    Details: {
      Plot: '',
    },
  },
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case movieActions.default.START_FETCH_MOVIES:
      return {
        ...state,
        isLoading: true,
      };
    case movieActions.default.SET_CURRENT:
      return {
        ...state,
        activeMovie: action.payload,
        movie: state.moviesData[action.payload],
      };
    case movieActions.default.FETCH_MOVIES:
      return {
        ...state,
        moviesData: action.payload.moviesData,
        orderType: action.payload.order,
        isLoading: false,
      };
    case movieActions.default.ORDER_BY:
      return {
        ...state,
        moviesData: action.payload.moviesData,
        orderType: action.payload.order,
      };
    default:
      return state;
  }
};
