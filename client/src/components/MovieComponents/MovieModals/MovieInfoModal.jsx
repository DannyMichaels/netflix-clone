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

export default function MovieInfoModal({ setOpen, open, movie }) {
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
      <div>
        <p>More Like This</p>

        <StyledGrid>
          {[1, 2, 3].map((item, idx) => (
            <picture
              style={{
                width: '100%',
              }}
            >
              <img
                style={{
                  width: '100%',
                  borderRadius: '4px',
                }}
                src="https://occ-0-448-444.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABaDYaC2oYzusK_YisZWvN8pG0LAcwltAto5wBa40UBPVeadZZ8EnvN_PjGXCyeCpcALUM9kyNguNafsj6ttRu_p-wk4.webp?r=559"
                alt="gg"
              />
            </picture>
          ))}
        </StyledGrid>
      </div>
    </Dialog>
  );
}
