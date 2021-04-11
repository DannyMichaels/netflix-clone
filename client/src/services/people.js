import { TMDB_API as api } from './apiConfig';

export const getOnePersonById = async (personId) => {
  try {
    const { data } = await api.get(
      `/person/${personId}?language=en-US&api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};
