import { useState } from 'react';
import { useMovieSelect } from '../../../hooks/useMovieSelect';
import MovieInfoModal from '../MovieModals/MovieInfoModal';

const MovieCard = ({ src, alt, className, movie }) => {
  const { onPlayMovie } = useMovieSelect();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={className ?? 'movie-card'}
        onClick={() => setIsModalOpen(movie?.id)}
      />

      <MovieInfoModal
        open={isModalOpen === movie?.id}
        setOpen={setIsModalOpen}
        movie={movie}
      />
    </>
  );
};

export default MovieCard;
