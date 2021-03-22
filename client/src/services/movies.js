import { TMDB_API as api } from './apiConfig';

export const getAllMovies = async (fetchUrl) => {
  try {
    const {
      data: { results },
    } = await api.get(fetchUrl);
    return results;
  } catch (error) {
    throw error;
  }
};
