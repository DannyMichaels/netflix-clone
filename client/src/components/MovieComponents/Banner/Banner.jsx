import { useState, useMemo } from 'react';

// services and utils
import { getOneRandomMovie } from '../../../services/movies';
import { truncate } from '../../../utils/truncate';

// icons
import PlayIcon from '@material-ui/icons/PlayArrow';
import InfoIcon from '@material-ui/icons/InfoOutlined';

//styles
import { StyledBanner } from './banner.styles';

export default function Banner() {
  const [movie, setMovie] = useState(null);

  useMemo(async () => {
    const oneMovie = await getOneRandomMovie();
    setMovie(oneMovie);
  }, []);

  return (
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
          <button className="banner__button">
            <PlayIcon fontSize="small" />
            &nbsp;
            <span>Play</span>
          </button>
          <button className="banner__button info">
            <InfoIcon fontSize="small" />
            &nbsp;&nbsp;
            <span>More Info</span>
          </button>
        </div>
      </div>
      <div className="banner--fadeBottom" />
    </StyledBanner>
  );
}
