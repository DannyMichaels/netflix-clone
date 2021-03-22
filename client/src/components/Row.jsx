import { useState, useMemo } from 'react';
import { getAllMovies } from '../services/movies';

export default function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  useMemo(async () => {
    const movieData = await getAllMovies(fetchUrl);
    return setMovies(movieData);
  }, [fetchUrl]);
  console.log({ movies });

  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
}
