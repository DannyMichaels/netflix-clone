// core-components/hooks
import {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useMovieSelect } from '../../../hooks/useMovieSelect';

// components
import Dialog from '@material-ui/core/Dialog';
import YouTube from 'react-youtube';

// icons
import CloseIcon from '@material-ui/icons/Close';

// services and utils
import { Link, useHistory } from 'react-router-dom';
import { truncate } from '../../../utils/truncate';
import { baseImgUrl, COLORS } from '../../../utils/generalUtils';
import { getCastByMovieId } from '../../../services/movies';

// styles
import {
  StyledGrid,
  StyledBox,
  StyledDialogContent,
  StyledVideo,
} from './MovieInfoModal.styles.js';

// Context
import { MoviesStateContext } from '../../../context/movies/moviesContext';
import { CircularProgressLoading } from '../../shared/Loading/CircularProgressLoading';
import { SearchContext } from '../../../context/search/searchContext';

export default function MovieInfoModal({
  setOpen,
  open,
  movie,
  recommendedMovies,
}) {
  const { onSelectMovie, trailerUrl, onPlayMovie } = useMovieSelect();
  const { allGenres } = useContext(MoviesStateContext);
  const { setSearch } = useContext(SearchContext);
  const [genres, setGenres] = useState([]);
  const [cast, setCast] = useState([]);
  const isMounted = useRef(true);
  const { push } = useHistory();

  useMemo(async () => {
    if (!isMounted.current) return;

    if (open) {
      onSelectMovie(movie);
      isMounted.current = false;
      return () => {
        onSelectMovie(movie);
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
    height: '400',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
    },
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onRedirect = async (type, id) => {
    setSearch('');
    handleClose();
    push(`/browse/${type}/${id}`);
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

      <StyledVideo>
        {trailerUrl ? (
          <YouTube videoId={trailerUrl} opts={VIDEO_PLAYER_OPTIONS} />
        ) : (
          <div className="modal__loading--container">
            <CircularProgressLoading thickness={1} marginTop="6em" size={150} />
          </div>
        )}
      </StyledVideo>

      <br />

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
                    {movie?.first_air_date?.match(/\d{4}/) || // some movies have first_air_date and some have release_date
                      movie?.release_date?.match(/\d{4}/)}
                  </div>
                </div>
              </div>
            </div>
            <div className="metaData__right">
              <div className="metaData__right--tags cast">
                <span>Cast:&nbsp;</span>
                {cast.map((person, idx) => (
                  <Fragment key={person.id}>
                    <Link
                      key={person.id}
                      onClick={() => onRedirect('person', person.id)}
                    >
                      {person.name}
                      {idx !== cast.length - 1 && ','}
                    </Link>
                    &nbsp;
                  </Fragment>
                ))}
              </div>

              <div className="metaData__right--tags genres">
                <span>Genres:&nbsp;</span>
                {[...new Set(genres)].map(
                  (genre, idx) =>
                    genre && (
                      <Fragment key={genre.id}>
                        <Link
                          to={`/browse/genre/${genre.id}`}
                          onClick={() => onRedirect('genre', genre.id)}
                        >
                          {genre.name}
                          {/* don't show "," if it's the last genre in the list */}
                          {idx !== genres.length - 1 && ','}
                        </Link>
                        &nbsp;
                      </Fragment>
                    )
                )}
              </div>
            </div>
          </div>
          {recommendedMovies?.length ? (
            <StyledGrid aria-label="recommended movies">
              <h2>More Like This</h2>
              <ul>
                {recommendedMovies
                  ?.filter(({ backdrop_path, overview }) =>
                    Boolean(backdrop_path && overview)
                  ) // filter by attributes that aren't null undefined.
                  .map((recommendedMovie) => (
                    <li
                      className="modal__recommendedMovie"
                      key={recommendedMovie.id}
                    >
                      <picture>
                        <img
                          src={`${baseImgUrl}${recommendedMovie.backdrop_path}`}
                          alt={recommendedMovie.name}
                          onClick={() => onPlayMovie(recommendedMovie)}
                        />
                      </picture>
                      <div className="modal__recommendedMovie--description">
                        <p>{truncate(recommendedMovie.overview, 200)}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </StyledGrid>
          ) : (
            <></>
          )}
          <br />
        </div>
      </StyledDialogContent>
    </Dialog>
  );
}
