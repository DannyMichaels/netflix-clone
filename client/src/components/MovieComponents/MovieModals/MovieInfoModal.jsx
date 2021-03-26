import { useEffect, useRef } from 'react';

// components
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import YouTube from 'react-youtube';
import { LinearProgress } from '@material-ui/core';

// icons
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useMovieSelect } from '../../../hooks/useMovieSelect';

// styles
import { StyledGrid } from './MovieInfoModal.styles.js';
import { baseImgUrl, COLORS } from '../../../utils/generalUtils';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    marginLeft: 10,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

// code for dialog referenced from Material-ui's docs
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

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
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {movie?.name}
      </DialogTitle>
      <DialogContent>
        {trailerUrl ? (
          <YouTube videoId={trailerUrl} opts={VIDEO_PLAYER_OPTIONS} />
        ) : (
          <LinearProgress />
        )}
      </DialogContent>
      {recommendedMovies.length && (
        <StyledGrid aria-label="recommended movies">
          <p>More Like This</p>
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
                  dwdowdwdkw
                </div>
              </li>
            ))}
          </ul>
        </StyledGrid>
      )}
    </Dialog>
  );
}
