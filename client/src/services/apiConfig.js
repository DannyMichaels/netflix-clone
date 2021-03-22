import axios from 'axios';

const TMDB_API = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export default TMDB_API;
