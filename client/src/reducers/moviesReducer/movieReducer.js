import { FETCH_MOVIES, FETCH_GENRES } from './movieReducerTypes';

export const movieReducer = (state, action) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        allMovies: action.payload,
        moviesAreLoading: false,
      };

    case FETCH_GENRES:
      return {
        allGenres: action.payload,
      };

    default:
      return state;
  }
};
