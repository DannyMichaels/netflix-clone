import { MOVIE_REQUESTS as REQUESTS } from '../../utils/movieUrls';

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
