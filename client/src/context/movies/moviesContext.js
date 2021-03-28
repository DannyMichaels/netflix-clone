import React, { createContext, useReducer, useMemo } from 'react';
import { movieRows } from '../../pages/Home/home.utils';
import { movieReducer } from '../../reducers/movieReducer';
import { getAllGenres, getAllMovies } from '../../services/movies';
import { TYPES } from './movieReducerTypes';

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
    movieRows.map(
      async ({ fetchUrl }) =>
        await getAllMovies(fetchUrl)
          .then((movieData) =>
            dispatch({
              type: TYPES.FETCH_MOVIES,
              payload: movieData,
              moviesAreLoading: false,
            })
          )
          .catch((err) => console.error(err.message))
    );

    await getAllGenres()
      .then(({ genres }) => {
        dispatch({
          type: TYPES.FETCH_GENRES,
          payload: genres,
        });
      })
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <MoviesStateContext.Provider value={state}>
      <MoviesDispatchContext.Provider value={dispatch}>
        {children}
      </MoviesDispatchContext.Provider>
    </MoviesStateContext.Provider>
  );
};

export default MoviesContextProvider;
