import { useState, useMemo } from 'react';
import { getAllMovies } from '../../services/movies';
import MovieCard from '../Movies/MovieCard/MovieCard';
import { StyledRow } from './row.styles';

const baseUrl = 'https://image.tmdb.org/t/p/original';

export default function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  useMemo(async () => {
    const movieData = await getAllMovies(fetchUrl);
    setMovies(movieData);
  }, [fetchUrl]);

  const CARDS = movies.map((movie) => (
    <MovieCard
      src={`${baseUrl}${movie.poster_path}`}
      alt={movie.name}
      key={movie.id}
      className="row__poster"
    />
  ));

  return (
    <StyledRow className="row">
      <h2>{title}</h2>

      <div className="row__posters">{CARDS}</div>
    </StyledRow>
  );
}
