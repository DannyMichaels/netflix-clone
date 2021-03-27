// hooks
import { useEffect, useRef } from 'react';
import { useMovieSelect } from '../../../hooks/useMovieSelect';

// components
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import YouTube from 'react-youtube';
import { LinearProgress } from '@material-ui/core';

// icons
import CloseIcon from '@material-ui/icons/Close';

// utils
import { truncate } from '../../../utils/truncate';
import { baseImgUrl, COLORS } from '../../../utils/generalUtils';

// styles
import { StyledGrid, StyledBox } from './MovieInfoModal.styles.js';

export default function MovieInfoModal({
  setOpen,
  open,
  movie,
  recommendedMovies,
}) {
  const { onSelectMovie, trailerUrl } = useMovieSelect();
  const isMounted = useRef(true);

  useEffect(() => {
    if (!isMounted.current) return;

    if (open) {
      onSelectMovie(movie);
      return () => {
        isMounted.current = false;
      };
    }
  }, [movie, onSelectMovie, open]);

  const VIDEO_PLAYER_OPTIONS = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
    },
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullWidth
      onClose={handleClose}
      aria-labelledby={movie?.title}
      open={open}
      maxWidth="md"
      scroll="body"
      id={movie?.id}
      PaperProps={{
        style: {
          backgroundColor: COLORS.VERY_BRIGHT_BLACK,
          boxShadow: 'none',
        },
      }}
    >
      <StyledBox onClick={handleClose}>
        <CloseIcon fontSize="large" />
      </StyledBox>
      {trailerUrl ? (
        <YouTube videoId={trailerUrl} opts={VIDEO_PLAYER_OPTIONS} />
      ) : (
        <LinearProgress />
      )}
      <DialogContent>
        {recommendedMovies.length ? (
          <StyledGrid aria-label="recommended movies">
            <h2>More Like This</h2>
            <ul>
              {recommendedMovies.map((movie) => (
                <li className="modal__recommendedMovie">
                  <picture>
                    <img
                      src={`${baseImgUrl}${movie.backdrop_path}`}
                      alt={movie.name}
                    />
                  </picture>
                  <div className="modal__recommendedMovie--description">
                    <p className="sypnosis">{truncate(movie.overview, 200)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </StyledGrid>
        ) : (
          <></>
        )}
      </DialogContent>
    </Dialog>
  );
}
