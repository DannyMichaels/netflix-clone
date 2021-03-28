import { IconButton } from '@material-ui/core';
import { useState } from 'react';
import { useMovieSelect } from '../../../hooks/useMovieSelect';
import MovieInfoModal from '../MovieModals/MovieInfoModal';

// Icons
import PlayIcon from '@material-ui/icons/PlayArrow';
import AddIcon from '@material-ui/icons/Add';
import DownVoteIcon from '@material-ui/icons/ThumbDown';
import UpVoteIcon from '@material-ui/icons/ThumbUp';

// Utils
import { COLORS } from '../../../utils/generalUtils';

const MovieCard = ({ src, alt, className, movie, isLargeRow }) => {
  const { onPlayMovie } = useMovieSelect();
  const [isExtraInfoShowing, setIsExtraInfoShowing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [vote, setVote] = useState('');

  const showMore = () => {
    setIsExtraInfoShowing(movie.id);
  };

  const showLess = () => {
    setIsExtraInfoShowing(false);
  };

  return (
    <>
      <div
        className={`movie__card--parent ${isLargeRow && 'large'}`}
        onMouseEnter={showMore}
        onMouseLeave={showLess}
      >
        <img
          src={src}
          alt={alt}
          className={className ?? 'movie-card'}
          onClick={() => setIsModalOpen(movie?.id)}
        />
        <div
          className={`movie__card--extraInfo ${
            !isExtraInfoShowing ? 'inactive' : 'active'
          }`}
        >
          <IconButton style={{ background: 'white' }}>
            <PlayIcon fontSize="small" style={{ color: 'black' }} />
          </IconButton>

          <IconButton style={{ background: COLORS.VERY_BRIGHT_BLACK }}>
            <AddIcon fontSize="small" style={{ color: 'white' }} />
          </IconButton>

          <IconButton
            style={{ background: COLORS.VERY_BRIGHT_BLACK }}
            onClick={() => setVote('upVote')}
          >
            <UpVoteIcon fontSize="small" style={{ color: 'white' }} />
          </IconButton>

          <IconButton
            style={{ background: COLORS.VERY_BRIGHT_BLACK }}
            onClick={() => setVote('downVote')}
          >
            <DownVoteIcon fontSize="small" style={{ color: 'white' }} />
          </IconButton>
        </div>
      </div>

      <MovieInfoModal
        open={isModalOpen === movie?.id}
        setOpen={setIsModalOpen}
        movie={movie}
      />
    </>
  );
};

export default MovieCard;
