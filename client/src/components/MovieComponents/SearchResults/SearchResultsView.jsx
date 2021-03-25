import { useCallback, useState } from 'react';

// services and utils
import { getYoutubeVideo } from '../../../services/movies';

// components
import MovieCard from '../MovieCard/MovieCard';
import YouTube from 'react-youtube';

//styles
import { InnerColumn } from './searchResults.styles';

const baseUrl = 'https://image.tmdb.org/t/p/original';

export default function SearchResultsView({ getQueriedMovies }) {
  const [trailerUrl, setTrailerUrl] = useState('');
  const [mediaType, setMediaType] = useState('');

  const OPTIONS = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = useCallback(
    (movie) => {
      if (trailerUrl) {
        setTrailerUrl(trailerUrl);
        console.log({ trailerUrl });
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
    [mediaType, trailerUrl]
  );

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
      {trailerUrl && <YouTube videoId={trailerUrl} opts={OPTIONS} />}
    </InnerColumn>
  );
}
