import { TMDB_API } from '../../services/apiConfig';
import { MOVIE_REQUESTS as REQUESTS } from '../../utils/movieRequests';

export const movieRows = [
  {
    title: 'Netflix Originals',
    fetchUrl: REQUESTS.FETCH_NETFLIX_ORIGINALS,
  },
  {
    title: 'Trending Now',
    fetchUrl: REQUESTS.FETCH_TRENDING,
  },
  {
    title: 'Top Rated',
    fetchUrl: REQUESTS.FETCH_TOP_RATED,
  },
  {
    title: 'Action Movies',
    fetchUrl: REQUESTS.FETCH_ACTION_MOVIES,
  },
  {
    title: 'Comedy Movies',
    fetchUrl: REQUESTS.FETCH_COMEDY_MOVIES,
  },
  {
    title: 'Horror Movies',
    fetchUrl: REQUESTS.FETCH_HORROR_MOVIES,
  },
  {
    title: 'Romance Movies',
    fetchUrl: REQUESTS.FETCH_ROMANCE_MOVIES,
  },
  {
    title: 'Documentaries',
    fetchUrl: REQUESTS.FETCH_DOCUMENTARIES,
  },
];

export const handleSearch = async (event, search, setSearch, setMovies) => {
  const { value: userInput } = event.target;

  // TODO: once we have accounts set up, have a terenary opertaror for the users age regarding include adult being true or false
  setSearch(userInput.toLowerCase());

  const searchUrl = `/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&include_adult=false
    &query=${search}`;

  const { data } = await TMDB_API.get(searchUrl);

  const newQueriedMovies = data.results.map((res) => ({
    ...res,
    title: res.title.toLowerCase(),
    fetchUrl: searchUrl,
  }));

  setMovies(newQueriedMovies);
};
