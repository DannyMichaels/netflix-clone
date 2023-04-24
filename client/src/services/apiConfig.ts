import axios, { AxiosInstance } from 'axios';

export const TMDB_API: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  httpsAgent: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain',
    },
  },
});
