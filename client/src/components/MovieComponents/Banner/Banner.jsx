import { useState, useMemo } from 'react';

// services and utils
import { getOneRandomMovie } from '../../../services/movies';
import { truncate } from '../../../utils/truncate';

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
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>

          <h1 className="banner__description">
            {truncate(movie?.overview, 250)}
          </h1>
        </div>
      </div>
      <div className="banner--fadeBottom"></div>
    </StyledBanner>
  );
}
