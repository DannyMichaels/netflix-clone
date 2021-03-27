// hooks
import { useContext, useEffect, useRef, useState } from 'react';
import { useMovieSelect } from '../../../hooks/useMovieSelect';

// components
import Dialog from '@material-ui/core/Dialog';
import YouTube from 'react-youtube';
import { LinearProgress } from '@material-ui/core';

// icons
import CloseIcon from '@material-ui/icons/Close';

// utils
import { truncate } from '../../../utils/truncate';
import { baseImgUrl, COLORS } from '../../../utils/generalUtils';

// styles
import {
  StyledGrid,
  StyledBox,
  StyledDialogContent,
} from './MovieInfoModal.styles.js';

// Context
import { MoviesStateContext } from '../../../context/moviesContext';

export default function MovieInfoModal({
  setOpen,
  open,
  movie,
  recommendedMovies,
}) {
  const { onSelectMovie, trailerUrl } = useMovieSelect();
  const { allGenres } = useContext(MoviesStateContext);
  const [genres, setGenres] = useState([]);
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

  useEffect(() => {
    const getGenres = async (movie) => {
      if (!movie) return;
      if (!allGenres) return;

      for (let i = 0; i < allGenres.length; i++) {
        let foundGenre = allGenres.find(
          (g) => g.id === Number(movie.genre_ids[i])
        );
        if (foundGenre) {
          setGenres((prevState) => [...prevState, foundGenre]);
        }
      }
    };
    getGenres(movie);
  }, [allGenres, movie]);

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
      <StyledDialogContent>
        {[...new Set(genres)]?.map(({ name }) => (
          <>&nbsp; {name}</>
        ))}
        {recommendedMovies?.length ? (
          <StyledGrid aria-label="recommended movies">
            <h2>More Like This</h2>
            <ul>
              {recommendedMovies?.map((movie) => (
                <li className="modal__recommendedMovie" key={movie.id}>
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
      </StyledDialogContent>
    </Dialog>
  );
}
