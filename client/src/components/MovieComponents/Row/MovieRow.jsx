import { useState, useMemo } from 'react';

// services and utils
import { getAllMovies } from '../../../services/movies';
import movieTrailer from 'movie-trailer';

// components
import MovieCard from '../MovieCard/MovieCard';
import Youtube from 'react-youtube';

// styles
import { StyledRow } from './movieRow.styles';

const baseUrl = 'https://image.tmdb.org/t/p/original';

export default function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  useMemo(async () => {
    const movieData = await getAllMovies(fetchUrl);
    setMovies(movieData);
  }, [fetchUrl]);

  
  const OPTIONS = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };
  
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.name ?? '')
      .then((url) => {
        const { get } = new URLSearchParams(new URL(url).search);
        setTrailerUrl(get('v'));
      })
      .catch((err) => console.error(err.message));
    }
  };

  const CARDS = movies.map((movie) => (
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
      {trailerUrl && <Youtube videoId={trailerUrl} opts={OPTIONS} />}
    </StyledRow>
  );
}
