import { useState } from 'react';
import MovieInfoModal from '../MovieModals/MovieInfoModal';

const MovieCard = ({ src, alt, className, movie, isLargeRow, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* <div
        className={`movie__card--parent${isLargeRow ? ' large' : ''}`}
        aria-label={`card ${index + 1} displaying: ${movie.name}`}
      > */}
      <img
        src={src}
        alt={alt}
        aria-label={`card ${index + 1} displaying: ${movie.name}`}
        className={className ?? 'movie-card'}
        onClick={() => setIsModalOpen(movie?.id)}
      />
      {/* </div> */}

      <MovieInfoModal
        open={isModalOpen === movie?.id}
        setOpen={setIsModalOpen}
        movieToPlay={movie}
      />
    </>
  );
};

export default MovieCard;
