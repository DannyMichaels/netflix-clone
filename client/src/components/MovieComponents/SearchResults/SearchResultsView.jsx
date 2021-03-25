import { useCallback } from 'react';

// services and utils
import { getYoutubeVideo } from '../../../services/movies';
import Levenshtein from 'levenshtein';

// components
import MovieCard from '../MovieCard/MovieCard';

//styles
import { InnerColumn } from './searchResults.styles';

const baseUrl = 'https://image.tmdb.org/t/p/original';

export default function SearchResultsView({
  handleVideoProps,
  queriedMovies,
  search,
}) {
  const {
    trailerUrl,
    setTrailerUrl,
    setSelectedMovie,
    mediaType,
    setMediaType,
  } = handleVideoProps;

  const handleClick = useCallback(
    (movie) => {
      setSelectedMovie(movie);
      if (trailerUrl) {
        setTrailerUrl(trailerUrl);
      }
      if (movie?.media_type) {
        setMediaType(movie.media_type);
      } else if (movie?.first_air_date) {
        setMediaType('tv');
      } else {
        setMediaType('movie');
      }

      const getTrailer = async () => {
        const fetchedUrl = await getYoutubeVideo(mediaType, movie.id);
        setTrailerUrl(fetchedUrl);
      };
      getTrailer();
    },
    [mediaType, trailerUrl, setMediaType, setSelectedMovie, setTrailerUrl]
  );

  const getQueriedMovies = () => {
    return queriedMovies.sort((a, b) => {
      let leva = new Levenshtein(a.title, search).distance; // the movie that is closest to user's search input will appear in top-left.
      let levb = new Levenshtein(b.title, search).distance;
      return leva - levb;
    });
  };

  return (
    <InnerColumn results={!getQueriedMovies().length}>
      {!getQueriedMovies().length && <h1>no results</h1>}
      <ul className="home__searchList">
        {getQueriedMovies().map((movie) => (
          <picture>
            <MovieCard
              onClick={() => handleClick(movie)}
              src={`${baseUrl}${movie.backdrop_path}`}
              alt={movie.name}
              key={movie.id}
              className="home__searched-movie"
            />
          </picture>
        ))}
      </ul>
    </InnerColumn>
  );
}
