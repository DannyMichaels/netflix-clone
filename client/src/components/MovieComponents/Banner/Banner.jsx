import { useState, useMemo } from 'react';
import { getOneRandomMovie } from '../../../services/movies';
import styled from 'styled-components';

const StyledHeader = styled.header`
  background-size: cover;
  background-image: ${({ imgUrl }) => `url(${imgUrl})`};
  background-position: center center;
`;

function Banner() {
  const [movie, setMovie] = useState(null);

  useMemo(async () => {
    const oneMovie = await getOneRandomMovie();
    setMovie(oneMovie);
  }, []);

  return (
    <StyledHeader
      aria-label="banner"
      imgUrl={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
    >
      <div className="banner__contents">
        <h1>{movie?.title || movie?.name || movie?.original_name}</h1>

        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
      </div>
    </StyledHeader>
  );
}

export default Banner;
