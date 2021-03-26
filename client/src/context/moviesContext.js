import React, { createContext, useReducer, useMemo } from 'react';
import { movieRows } from '../pages/Home/home.utils';
import { getAllMovies } from '../services/movies';
export const MoviesStateContext = createContext();
export const MoviesDispatchContext = createContext();

const movieReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH':
      return {
        allMovies: action.payload,
      };
    default:
      return state;
  }
};

const MoviesContextProvider = ({ children }) => {
  const initialMoviesState = {
    allMovies: [],
    moviesAreLoading: true,
  };

  const [state, dispatch] = useReducer(movieReducer, initialMoviesState);

  useMemo(async () => {
    movieRows.map(
      async ({ fetchUrl }) =>
        await getAllMovies(fetchUrl).then((movieData) =>
          dispatch({
            type: 'FETCH',
            payload: movieData,
            moviesAreLoading: false,
          })
        )
    );
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
