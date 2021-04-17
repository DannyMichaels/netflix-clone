import { useState, useMemo, useRef, useEffect } from 'react';

// services and utils
import { getAllMovies } from '../../../services/movies';
import { baseImgUrl } from '../../../utils/generalUtils';

// components
import MovieCard from '../MovieCard/MovieCard';

// styles
import { StyledRow } from './row.styles';

// icons
// import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
// import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';

export default function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [isVisible, setIsVisible] = useState(5);
  const [counter, setCounter] = useState(0);
  const [visiblePosterCount, setVisiblePosterCount] = useState(
    Math.round(document.body.clientWidth / 200)
  );

  const rowRef = useRef(null);

  useMemo(async () => {
    const movieData = await getAllMovies(fetchUrl);
    const moviesThatHaveImage = movieData.filter(({ backdrop_path }) =>
      Boolean(backdrop_path)
    );
    setMovies(moviesThatHaveImage);
  }, [fetchUrl]);

  useEffect(() => {}, []);

  const onScrollNext = () => {
    const visibleElements = rowRef.current.querySelector('.visible');
    const allPosters = rowRef.current.querySelectorAll('.row__poster');

    for (let i = 0; i < allPosters.length; i++) {
      console.log('in i loop');
      if (allPosters[i].classList.contains('visibile')) {
        if (
          i + 1 < allPosters.length &&
          allPosters[i + 1].classList.contains('visibile')
        ) {
          console.log('in if block');
          allPosters[i].classList.remove('visibile');
        } else {
          console.log('in else block');

          for (
            let j = 0;
            j < visiblePosterCount && i + j < allPosters.length;
            j++
          ) {
            console.log('in J for loop', { i, j });
            allPosters[i + j].classList.add('visibile');
          }
          // allPosters[i].scrollIntoViewIfNeeded({
          //   behavior: 'smooth',
          //   inline: 'center',
          // });
          allPosters[i].scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
          });
          break;
        }
      }
    }
  };

  const onScrollBack = () => {
    const visibleElements = rowRef.current.querySelector('.visible');
    const allPosters = rowRef.current.querySelectorAll('.row__poster');

    for (let i = allPosters.length - 1; i >= 0; i--) {
      console.log('in i loop');
      if (allPosters[i].classList.contains('visibile')) {
        if (
          i - 1 < allPosters.length &&
          allPosters[i - 1].classList.contains('visibile')
        ) {
          console.log('in if block');
          allPosters[i].classList.remove('visibile');
        } else {
          console.log('in else block');
          let j = 0;
          for (j; j < visiblePosterCount && i - j > 0; j++) {
            console.log('in J for loop', { i, j });
            allPosters[i - j].classList.add('visibile');
          }
          // allPosters[i].scrollIntoViewIfNeeded({
          //   behavior: 'smooth',
          //   inline: 'center',
          // });
          allPosters[i - j].scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
          });
          break;
        }
      }
    }
  };

  const CARDS = movies?.map((movie, index) => (
    <MovieCard
      movie={movie}
      src={`${baseImgUrl}${
        isLargeRow ? movie.poster_path : movie.backdrop_path
      }`}
      isLargeRow={isLargeRow}
      alt={movie.name}
      key={movie.id}
      className={`row__poster ${isLargeRow && 'row__posterLarge'} ${
        index < visiblePosterCount ? 'visibile' : ''
      }`}
    />
  ));

  return (
    <StyledRow aria-label="movies row" ref={rowRef}>
      <h2 className="row__title">{title}</h2>
      <button className="slider__nav prev" onClick={onScrollBack}>
        <span className="icon">
          &lt;
          {/* <ArrowBackIcon /> */}
        </span>
        {/* <span className="row__gradient" /> */}
      </button>
      <div className="row__posters">{CARDS}</div>
      <button className="slider__nav next" onClick={onScrollNext}>
        <span className="icon">
          &gt;
          {/* <ArrowForwardIcon /> */}
        </span>
        {/* <span className="row__gradient" /> */}
      </button>
    </StyledRow>
  );
}
