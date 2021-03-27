// hooks
import { useContext, useEffect, useRef, useState } from 'react';
import { useMovieSelect } from '../../../hooks/useMovieSelect';

// components
import Dialog from '@material-ui/core/Dialog';
import YouTube from 'react-youtube';
import { LinearProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';

// icons
import CloseIcon from '@material-ui/icons/Close';

// services and utils
import { truncate } from '../../../utils/truncate';
import { baseImgUrl, COLORS } from '../../../utils/generalUtils';
import { getCastByMovieId } from '../../../services/movies';

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
  const [cast, setCast] = useState([]);
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
    const getData = async (movie) => {
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

      const castData = await getCastByMovieId(movie.id);
      setCast(castData);
    };
    getData(movie);
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
        <div className="modal__container">
          <div className="modal__details--metaData">
            <div className="metaData__left">
              <div className="metaData__left--infoWrapper">
                <div className="metaData__firstLine">
                  <div className="movie__scoreContainer">
                    <span className="movie__score">
                      {movie?.vote_average * 10}% match
                    </span>
                  </div>
                </div>
                <div className="metaData__secondLine">
                  <div className="movie__year">
                    {/* only get the year from the release date by getting the first 4 digits of the release date. */}
                    {movie?.first_air_date.match(/\d{4}/)}
                  </div>
                </div>
              </div>
            </div>
            <div className="metaData__right">
              <div className="metaData__right--tags cast">
                <span>Cast:&nbsp;</span>
                {cast.map((person, idx) => (
                  <Link key={person.id} to={`/browse/person/${person.id}`}>
                    {person.name}
                    {idx !== cast.length - 1 && ','}&nbsp;
                  </Link>
                ))}
              </div>

              <div className="metaData__right--tags genres">
                <span>Genres:&nbsp;</span>
                {[...new Set(genres)].map(
                  (genre, idx) =>
                    genre && (
                      <Link to={`/browse/genre/${genre.id}`} key={genre.id}>
                        {genre.name}
                        {/* don't show "," if it's the last genre in the list */}
                        {idx !== genres.length - 1 && ','}&nbsp;
                      </Link>
                    )
                )}
              </div>
            </div>
          </div>
          {recommendedMovies?.length ? (
            <StyledGrid aria-label="recommended movies">
              <h2>More Like This</h2>
              <ul>
                {recommendedMovies?.map((recMovie) => (
                  <li className="modal__recommendedMovie" key={recMovie.id}>
                    <picture>
                      <img
                        src={`${baseImgUrl}${recMovie.backdrop_path}`}
                        alt={recMovie.name}
                      />
                    </picture>
                    <div className="modal__recommendedMovie--description">
                      <p className="sypnosis">
                        {truncate(recMovie.overview, 200)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </StyledGrid>
          ) : (
            <></>
          )}
        </div>
      </StyledDialogContent>
    </Dialog>
  );
}
