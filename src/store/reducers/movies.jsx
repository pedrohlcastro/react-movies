import { movieActions } from '../actions';


const INITIAL_STATE = {
  moviesData: [],
  orderDirection: 'desc',
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
        orderType: '',
        orderDirection: 'desc',
        isLoading: false,
      };
    case movieActions.default.ORDER_BY:
      return {
        ...state,
        moviesData: action.payload.moviesData,
        orderType: action.payload.order,
        orderDirection: action.payload.direction,
      };
    default:
      return state;
  }
};
