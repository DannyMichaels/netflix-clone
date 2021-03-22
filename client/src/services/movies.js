import { MOVIE_REQUESTS as REQUESTS } from '../utils/movieUrls';
import { TMDB_API as api } from './apiConfig';

export const getAllMovies = async (fetchUrl) => {
  try {
    const { data } = await api.get(fetchUrl);
    return data.results;
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
