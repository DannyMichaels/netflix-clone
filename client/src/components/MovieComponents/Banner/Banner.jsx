// hooks
import { useState, useMemo, useContext } from 'react';
import { useMovieSelect } from '../../../hooks/useMovieSelect';

// services and utils
import { getOneRandomMovie } from '../../../services/movies';
import { truncate } from '../../../utils/truncate';

// icons
import PlayIcon from '@material-ui/icons/PlayArrow';
import InfoIcon from '@material-ui/icons/InfoOutlined';

//styles
import { StyledBanner } from './banner.styles';
import { MoviesStateContext } from '../../../context/moviesContext';

export default function Banner() {
  const [movie, setMovie] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  const { handleSelectMovie } = useMovieSelect();
  const { allMovies } = useContext(MoviesStateContext);

  useMemo(async () => {
    const oneMovie = await getOneRandomMovie();
    setMovie(oneMovie);
  }, []);

  useMemo(async () => {
    const match = 0 || 1 || 2 || 3 || 4 || 5 || 6 || 7 || 9 || 10;

    if (movie?.genre_ids) {
      const moviesAlike = allMovies.filter(
        (m) => m.genre_ids[match] === Number(movie.genre_ids[match])
      );
      setRecommendedMovies(moviesAlike);
    }
  }, [allMovies, movie]);

  const toggleInfoOpen = () => {
    setIsInfoOpen(!isInfoOpen);
  };

  return (
    <>
      <StyledBanner
        aria-label="banner"
        imgUrl={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner__descriptionContainer">
            <h1 className="banner__description">
              {truncate(movie?.overview, 250)}
            </h1>
          </div>
          <div className="banner__buttons">
            <button
              className="banner__button"
              onClick={() => handleSelectMovie(movie)}
            >
              <PlayIcon fontSize="small" />
              &nbsp;
              <span>Play</span>
            </button>
            <button className="banner__button info" onClick={toggleInfoOpen}>
              <InfoIcon fontSize="small" />
              &nbsp;&nbsp;
              <span>More Info</span>
            </button>
          </div>
        </div>
        <div className="banner--fadeBottom" />
      </StyledBanner>
    </>
  );
}
