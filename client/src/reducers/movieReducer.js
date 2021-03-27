import { TYPES } from '../context/movieReducerTypes';

export const movieReducer = (state, action) => {
  switch (action.type) {
    case TYPES.FETCH_MOVIES:
      return {
        allMovies: action.payload,
        moviesAreLoading: false,
      };

    case TYPES.FETCH_GENRES:
      return {
        allGenres: action.payload,
      };

    default:
      return state;
  }
};
