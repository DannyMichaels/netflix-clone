import React, { createContext, useReducer, useMemo, useEffect } from 'react';

// utils
import { getAllGenres, getAllMovies } from '../../services/movies';
import { movieRows } from '../../pages/Browse/Home/home.utils';

// reducer
import { movieReducer } from '../../reducers/moviesReducer/movieReducer';
import {
  FETCH_GENRES,
  FETCH_MOVIES,
} from '../../reducers/moviesReducer/movieReducerTypes';

export const MoviesStateContext = createContext();
export const MoviesDispatchContext = createContext();

const MoviesContextProvider = ({ children }) => {
  const initialMoviesState = {
    allMovies: [],
    allGenres: [],
    moviesAreLoading: true,
  };

  const [state, dispatch] = useReducer(movieReducer, initialMoviesState);

  useMemo(async () => {
    const { genres } = await getAllGenres();
    dispatch({
      type: FETCH_GENRES,
      payload: genres,
    });
  }, []);

  useEffect(() => {
    const getMovies = async () => {
      movieRows.map(
        async ({ fetchUrl }) =>
          await getAllMovies(fetchUrl)
            .then((movieData) =>
              dispatch({
                type: FETCH_MOVIES,
                payload: movieData,
                moviesAreLoading: false,
              })
            )
            .catch((err) => console.error(err.message))
      );
    };

    if (state.allGenres?.length) {
      getMovies();
    }
  }, [state.allGenres?.length]);

  return (
    <MoviesStateContext.Provider value={state}>
      <MoviesDispatchContext.Provider value={dispatch}>
        {children}
      </MoviesDispatchContext.Provider>
    </MoviesStateContext.Provider>
  );
};

export default MoviesContextProvider;
