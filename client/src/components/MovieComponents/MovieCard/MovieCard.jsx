import { useMovieSelect } from '../../../hooks/useMovieSelect';

const MovieCard = ({ src, alt, className, movie }) => {
  const { onOpenModal, isInfoOpen, modalJSX } = useMovieSelect();

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={className ?? 'movie-card'}
        onClick={() => onOpenModal(movie)}
      />
      {isInfoOpen && modalJSX}
    </>
  );
};

export default MovieCard;
