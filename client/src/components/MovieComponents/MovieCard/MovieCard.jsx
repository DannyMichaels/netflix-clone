import { useState } from 'react';
import MovieInfoModal from '../MovieModals/MovieInfoModal';

const MovieCard = ({ src, alt, className, movie, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        aria-label={`card ${index + 1} displaying: ${movie.name}`}
        className={className ?? 'movie-card'}
        onClick={() => setIsModalOpen(movie?.id)}
      />

      <MovieInfoModal
        open={isModalOpen === movie?.id}
        setOpen={setIsModalOpen}
        movieToPlay={movie}
      />
    </>
  );
};

export default MovieCard;
