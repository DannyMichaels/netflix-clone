import { useState } from 'react';
import { useMovieSelect } from '../../../hooks/useMovieSelect';

const MovieCard = ({ src, alt, className, movie }) => {
  const { onPlayMovie, onOpenModal, isInfoOpen, modalJSX } = useMovieSelect();
  const [isExtraInfoShowing, setIsExtraInfoShowing] = useState(false);

  const showMore = () => {
    setIsExtraInfoShowing(movie.id);
  };

  const showLess = () => {
    setIsExtraInfoShowing(false);
  };

  return (
    <>
      <div>
        <img
          src={src}
          alt={alt}
          onMouseEnter={showMore}
          onMouseLeave={showLess}
          className={className ?? 'movie-card'}
          onClick={() => onOpenModal(movie)}
        />
        {isExtraInfoShowing && (
          <div className="extraInfo">Hello Beautiful People</div>
        )}
      </div>
      {isInfoOpen && modalJSX}
    </>
  );
};

export default MovieCard;
