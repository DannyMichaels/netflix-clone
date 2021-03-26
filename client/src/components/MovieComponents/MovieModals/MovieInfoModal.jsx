import { useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';

// components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import YouTube from 'react-youtube';
// icons
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useMovieSelect } from '../../../hooks/useMovieSelect';
import { LinearProgress } from '@material-ui/core';

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

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

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
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      id="video-card"
    >
      <DialogTitle
        style={{ minWidth: '200px' }}
        id="customized-dialog-title"
        onClose={handleClose}
      >
        {movie?.name}
      </DialogTitle>
      <DialogContent>
        {trailerUrl ? (
          <YouTube videoId={trailerUrl} opts={VIDEO_PLAYER_OPTIONS} />
        ) : (
          <LinearProgress />
        )}
      </DialogContent>
      <DialogActions
        style={{ display: 'flex', justifyContent: 'space-evenly' }}
      >
        <Button variant="contained" color="primary" onClick={handleClose}>
          Exit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
