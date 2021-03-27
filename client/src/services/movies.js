import { MOVIE_REQUESTS as REQUESTS } from '../utils/movieRequests';
import { TMDB_API as api } from './apiConfig';

export const getAllMovies = async (fetchUrl) => {
  try {
    const { data } = await api.get(fetchUrl);
    return data.results;
  } catch (error) {
    throw error;
  }
};

export const getSearchedMovies = async (searchValue) => {
  try {
    // TODO: once we have accounts set up, have a terenary opertaror for the users age regarding include adult being true or false
    const searchUrl = `/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&include_adult=false
      &query=${searchValue}`;

    const { data } = await api.get(searchUrl);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getOneRandomMovie = async () => {
  try {
    const {
      data: { results },
    } = await api.get(REQUESTS.FETCH_NETFLIX_ORIGINALS);
    return results[Math.floor(Math.random() * results.length)]; // get a random number starting from 0 and less than 1, multiply it by the count of results, Math.floor() function returns the largest integer less than or equal to a given number.
  } catch (error) {
    throw error;
  }
};

export const getYoutubeVideo = async (mediaType, id) => {
  try {
    if (mediaType) {
      const { data } = await api.get(
        `/${mediaType}/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos`
      );
      return data?.videos?.results[0]?.key;
    }
  } catch (error) {
    throw error;
  }
};

export const getAllGenres = async () => {
  try {
    const { data } = await api.get(
      `/genre/movie/list?language=en-US&api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};
