import { useState, useCallback, useMemo } from 'react';

// services and utils
import { getAllMovies, getYoutubeVideo } from '../../../services/movies';

// components
import MovieCard from '../MovieCard/MovieCard';

// styles
import { StyledRow } from './row.styles';

const baseUrl = 'https://image.tmdb.org/t/p/original';

export default function Row({ title, fetchUrl, isLargeRow, handleVideoProps }) {
  const [movies, setMovies] = useState([]);

  const { setTrailerUrl, setSelectedMovie } = handleVideoProps;

  useMemo(async () => {
    const movieData = await getAllMovies(fetchUrl);
    setMovies(movieData);
  }, [fetchUrl]);

  const getType = (movie) => {
    if (movie?.media_type) {
      return movie.media_type;
    } else if (movie?.first_air_date) {
      return 'tv';
    } else {
      return 'movie';
    }
  };

  const handleClick = useCallback(
    (movie) => {
      const type = getType(movie);

      setSelectedMovie(movie);

      const getTrailer = async () => {
        const fetchedUrl = await getYoutubeVideo(type, movie.id);
        setTrailerUrl(fetchedUrl);
      };
      getTrailer();
    },
    [setSelectedMovie, setTrailerUrl]
  );

  const CARDS = movies?.map((movie) => (
    <MovieCard
      onClick={() => handleClick(movie)}
      src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
      alt={movie.name}
      key={movie.id}
      className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
    />
  ));

  return (
    <StyledRow aria-label="movies row">
      <h2 className="row__title">{title}</h2>

      <div className="row__posters">{CARDS}</div>
    </StyledRow>
  );
}
