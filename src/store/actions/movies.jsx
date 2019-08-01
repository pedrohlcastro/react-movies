import { moviesService } from '../../services';
import { ratingsMean } from './helpers';

export const orderByAsync = (moviesData, order, direction) => ({
  type: 'ORDER_BY',
  payload: {
    moviesData,
    order,
    direction,
  },
});

export const orderBy = (moviesData, order, direction) => (dispatch) => {
  moviesData.sort((a, b) => {
    let keyA;
    let keyB;

    if (order === 'name') {
      keyA = a.Title;
      keyB = b.Title;
    } else if (order === 'ratings') {
      keyA = a.Details.RatingsMean;
      keyB = b.Details.RatingsMean;
    }

    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
  });

  if (direction === 'acs') {
    return dispatch(orderByAsync(moviesData.reverse(), order, direction));
  }

  return dispatch(orderByAsync(moviesData, order, direction));
};

export const startFetchMovies = () => ({
  type: 'START_FETCH_MOVIES',
});

export const fetchMoviesAsync = (moviesData, order) => ({
  type: 'FETCH_MOVIES',
  payload: {
    moviesData,
    order,
  },
});

export const fetchMovies = (title, order) => async (dispatch) => {
  let movies = [];
  dispatch(startFetchMovies());

  const res = await moviesService.seachByTitle(title);
  if (res.ok || !res.data.Reponse.Error) {
    movies = res.data.Search;

    await Promise.all(movies.map(async (movie, index) => {
      const detailsRes = await moviesService.searchById(movie.imdbID);
      if (res.ok || !res.data.Reponse.Error) {
        movies[index].Details = detailsRes.data;
        movies[index].Details.RatingsMean = await ratingsMean(movie.Details.Ratings);
      } else {
        movies[index].Details = {};
        movies[index].Details.RatingsMean = 0;
      }
    }));

    return dispatch(fetchMoviesAsync(movies, order));
  }

  return dispatch(fetchMoviesAsync([], order));
};

export const setCurrentMovie = index => ({
  type: 'SET_CURRENT',
  payload: index,
});

export default {
  SET_CURRENT: 'SET_CURRENT',
  FETCH_MOVIES: 'FETCH_MOVIES',
  ORDER_BY: 'ORDER_BY',
  START_FETCH_MOVIES: 'START_FETCH_MOVIES',
};
