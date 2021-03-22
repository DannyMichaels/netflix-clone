import { useState, useMemo } from 'react';
import { getAllMovies } from '../../services/movies';
import MovieCard from '../Movies/MovieCard/MovieCard';

export default function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  useMemo(async () => {
    const movieData = await getAllMovies(fetchUrl);
    return setMovies(movieData);
  }, [fetchUrl]);

  const CARDS = movies.map((movie) => (
    <MovieCard src={movie.poster_path} alt={movie.name} />
  ));

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">{CARDS}</div>
    </div>
  );
}
