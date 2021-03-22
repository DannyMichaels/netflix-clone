import axios from 'axios';

export const TMDB_API = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});
