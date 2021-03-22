const API_KEY = process.env.TMDB_API_KEY;

const MOVIE_REQUESTS = {
  FETCH_TRENDING: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  FETCH_NETFLIX_ORIGINALS: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  FETCH_TOP_RATED: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  FETCH_ACTION_MOVIES: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  FETCH_COMEDY_MOVIES: `/discover/novie?api_key=${API_KEY}&with_genres=35`,
  FETCH_HORROR_MOVIES: `/discover/movie?api_ke${API_KEY}&with_genres=27`,
  FETCH_ROMANCE_MOVIES: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  FETCH_DOCUMENTARIES: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export default MOVIE_REQUESTS;
