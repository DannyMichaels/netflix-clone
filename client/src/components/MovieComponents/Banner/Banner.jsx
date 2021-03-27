// hooks
import { useState, useMemo, useContext } from 'react';
import { useMovieSelect } from '../../../hooks/useMovieSelect';

// services and utils
import {
  getMoviesByGenreId,
  getOneRandomMovie,
  getRecommendedMovies,
} from '../../../services/movies';
import { truncate } from '../../../utils/truncate';

// icons
import PlayIcon from '@material-ui/icons/PlayArrow';
import InfoIcon from '@material-ui/icons/InfoOutlined';

//styles
import { StyledBanner } from './banner.styles';
import { MoviesStateContext } from '../../../context/moviesContext';
import MovieInfoModal from '../MovieModals/MovieInfoModal';

export default function Banner() {
  const [movie, setMovie] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  const { onPlayMovie } = useMovieSelect();

  const { allMovies } = useContext(MoviesStateContext);

  useMemo(async () => {
    const oneMovie = await getOneRandomMovie();
    setMovie(oneMovie);
  }, []);

  useMemo(async () => {
    if (!movie) return;
    const recommendedData = await getMoviesByGenreId(movie.genre_ids[0]);
    setRecommendedMovies(recommendedData);
  }, [movie]);

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
              onClick={() => onPlayMovie(movie)}
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

      <MovieInfoModal
        open={isInfoOpen}
        setOpen={setIsInfoOpen}
        recommendedMovies={recommendedMovies}
        movie={movie}
      />
    </>
  );
}
