import { createContext, useReducer, useLayoutEffect, useEffect } from 'react';

// utils / services
import { getAllMovies } from '../../services/movies';
import { getAllGenres } from '../../services/genres';
import { movieRows } from '../../utils/movieRequests';

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

  useEffect(() => {
    const fetchGenres = async () => {
      const { genres } = await getAllGenres();
      dispatch({
        type: FETCH_GENRES,
        payload: genres,
      });
    };
    fetchGenres();
  }, []);

  useLayoutEffect(() => {
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

    getMovies();
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
