// reuseable card component.
// I could just put the styling here with styled-components, but what if in the future we want to reuse it in a different page?
// therefore we give it a flexible className as props.

import { useMovieSelect } from '../../../hooks/useMovieSelect';

const MovieCard = ({ src, alt, className, onClick, movie }) => {
  const { onPlayMovie, onOpenModal, isInfoOpen, modalJSX } = useMovieSelect();

  const openModal = () => {
    onOpenModal(movie);
  };

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
