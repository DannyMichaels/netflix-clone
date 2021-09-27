import {
  createContext,
  useReducer,
  useLayoutEffect,
  useEffect,
  useContext,
} from 'react';

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
import { ProfilesStateContext } from '../profiles/profilesContext';

export const MoviesStateContext = createContext();
export const MoviesDispatchContext = createContext();

const MoviesContextProvider = ({ children }) => {
  const initialMoviesState = {
    allMovies: [],
    allGenres: [],
    moviesAreLoading: true,
  };

  const [state, dispatch] = useReducer(movieReducer, initialMoviesState);
  const { currentProfile } = useContext(ProfilesStateContext);

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
      const response = await Promise.all(
        movieRows.map(
          async ({ fetchUrl }) =>
            await getAllMovies(fetchUrl, currentProfile?.isKid)
        )
      );

      let moviesData = response.flat();

      dispatch({ type: FETCH_MOVIES, payload: moviesData });
    };

    getMovies();

    // eslint-disable-next-line
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
