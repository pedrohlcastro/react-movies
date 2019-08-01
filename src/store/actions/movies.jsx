import { movies } from '../../services';

export const fetchMoviesAsync = (moviesData, order) => ({
  type: 'FETCH_MOVIES',
  payload: {
    moviesData,
    order,
  },
});

export const fetchMovies = (title, order) => (dispatch) => {
  movies.seachByTitle(title)
    .then((res) => {
      if (res.ok || !res.data.Reponse.Error) {
        return dispatch(fetchMoviesAsync(res.data.Search, order));
      }
      return dispatch(fetchMoviesAsync([], order));
    });
};

export const setCurrentMovie = index => ({
  type: 'SET_CURRENT',
  payload: index,
});

export default {
  SET_CURRENT: 'SET_CURRENT',
  FETCH_MOVIES: 'FETCH_MOVIES',
};
