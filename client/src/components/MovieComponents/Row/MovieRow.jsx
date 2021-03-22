import { useState, useMemo } from 'react';
import { getAllMovies } from '../../../services/movies';
import MovieCard from '../MovieCard/MovieCard';
import { StyledRow } from './movieRow.styles';

const baseUrl = 'https://image.tmdb.org/t/p/original';

export default function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useMemo(async () => {
    const movieData = await getAllMovies(fetchUrl);
    setMovies(movieData);
  }, [fetchUrl]);

  const CARDS = movies.map((movie) => (
    <MovieCard
      src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
      alt={movie.name}
      key={movie.id}
      className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
    />
  ));

  return (
    <StyledRow aria-label="movie-row">
      <h2>{title}</h2>

      <div className="row__posters">{CARDS}</div>
    </StyledRow>
  );
}
