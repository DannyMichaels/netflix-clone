import { useState, useMemo } from 'react';
import { getAllMovies } from '../services/movies';

export default function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  useMemo(async () => {
    const movieData = await getAllMovies(fetchUrl);
    console.log(movieData);
    setMovies(movieData);
  }, [fetchUrl]);

  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
}
