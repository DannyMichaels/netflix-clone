import { useState, useMemo } from 'react';

// hooks
import { useMovieSelect } from '../../../hooks/useMovieSelect';

// services and utils
import { getAllMovies } from '../../../services/movies';
import { baseImgUrl } from '../../../utils/generalUtils';

// components
import MovieCard from '../MovieCard/MovieCard';

// styles
import { StyledRow } from './row.styles';

export default function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  const { onPlayMovie, onOpenModal, isInfoOpen, modalJSX } = useMovieSelect();

  useMemo(async () => {
    const movieData = await getAllMovies(fetchUrl);
    setMovies(movieData);
  }, [fetchUrl]);

  const CARDS = movies?.map((movie) => (
    <MovieCard
      onClick={() => onOpenModal(movie)}
      src={`${baseImgUrl}${
        isLargeRow ? movie.poster_path : movie.backdrop_path
      }`}
      alt={movie.name}
      key={movie.id}
      className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
    />
  ));

  return (
    <>
      <StyledRow aria-label="movies row">
        <h2 className="row__title">{title}</h2>

        <div className="row__posters">{CARDS}</div>
      </StyledRow>
      {isInfoOpen && modalJSX}
    </>
  );
}
