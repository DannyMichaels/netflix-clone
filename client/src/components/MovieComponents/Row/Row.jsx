import { Children, useState, useRef, useEffect, useCallback } from 'react';

// services and utils
import { getAllMovies } from '../../../services/movies';
import { baseImgUrl } from '../../../utils/generalUtils';

// components
import MovieCard from '../MovieCard/MovieCard';

// styles
import { StyledRow } from './row.styles';

// icons
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';

export default function Row({ title, fetchUrl, isLargeRow, rowIndex }) {
  const [movies, setMovies] = useState([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicators, setIndicators] = useState([]);
  const [moviesLength, setMoviesLength] = useState(0);
  const [translateXValue, setTranslateXValue] = useState(0);
  const [unclonedMoviesCount, setUnclonedMoviesCount] = useState(0);

  const [maxScrollPosition, setMaxScrollPosition] = useState(
    Math.round(document.body.clientWidth / 200)
  );

  const rowRef = useRef(null);
  const postersRef = useRef(null);

  const changeMaxScrollPosition = useCallback(() => {
    let allPosters = rowRef.current.querySelectorAll('.movie__card--parent');
    setMaxScrollPosition(
      Math.round(allPosters.length / (document.body.clientWidth / 200) + 1)
    );
  }, [movies.length]);

  const createIndicators = useCallback(() => {
    setIndicators([...new Array(maxScrollPosition).keys()]);
  }, [maxScrollPosition]);

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await getAllMovies(fetchUrl);
      const moviesThatHaveImage = movieData.filter(({ backdrop_path }) =>
        Boolean(backdrop_path)
      );

      setUnclonedMoviesCount(moviesThatHaveImage.length);

      console.log(moviesThatHaveImage.length);

      const copy = [...moviesThatHaveImage];
      for (let i = 0; i < 5; i++) {
        moviesThatHaveImage.push(copy[i]);
      }
      for (let i = copy.length - 1; i > copy.length - 1 - 5; i--) {
        moviesThatHaveImage.unshift(copy[i]);
      }
      setMovies(moviesThatHaveImage);

      setMoviesLength(moviesThatHaveImage.length * 250);
      setTranslateXValue(-5 * 250);
    };
    fetchData();
  }, [fetchUrl]);

  useEffect(() => {
    changeMaxScrollPosition();
    createIndicators();
  }, [changeMaxScrollPosition, createIndicators]);

  useEffect(() => {
    window.addEventListener('resize', changeMaxScrollPosition);
    return () => {
      window.removeEventListener('resize', changeMaxScrollPosition);
    };
  }, [changeMaxScrollPosition]);

  const onNavigate = (direction) => {
    const initial = -250 * 5;
    const actualLast = unclonedMoviesCount * -250;
    const lastAllowedPoster = actualLast + initial;

    setCanScrollPrev(rowIndex);

    if (direction === 'forward') {
      setTranslateXValue((prevState) => {
        let translateX = prevState - 250 * 5;
        if (translateX < actualLast) {
          return initial;
        } else {
          return translateX;
        }
      });
      // if (activeIndex === maxScrollPosition) return;
      // setActiveIndex((prev) => (prev += 1));
    } else {
      setTranslateXValue((prevState) => {
        let translateX = prevState + 250 * 5;
        if (translateX > initial) {
          return actualLast;
        } else {
          return translateX;
        }
      });

      // if (activeIndex > 0) {
      //   setActiveIndex((prev) => (prev -= 1));
      // }
    }
  };

  // };

  const CARDS = Children.toArray(
    movies?.map((movie, idx) => (
      <MovieCard
        index={idx}
        movie={movie}
        src={`${baseImgUrl}${
          isLargeRow ? movie.poster_path : movie.backdrop_path
        }`}
        isLargeRow={isLargeRow}
        alt={movie.name}
        className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
      />
    ))
  );

  return (
    <StyledRow
      aria-label="movies row"
      ref={rowRef}
      moviesLength={moviesLength}
      translateXValue={translateXValue}
    >
      <div className="row__headerContainer">
        <h2 className="row__title">{title}</h2>

        <ul className="row__pagination">
          {indicators.map((_, idx) => (
            <li
              className={`indicator${idx === activeIndex ? ' active' : ''}`}
            />
          ))}
        </ul>
      </div>
      {canScrollPrev === rowIndex && (
        <button
          className="slider__nav prev"
          onClick={() => onNavigate('backward')}
        >
          <span className="icon">
            {/* &lt; */}
            <ArrowBackIcon />
          </span>
          {/* <span className="row__gradient" /> */}
        </button>
      )}
      <div className="row__posters" ref={postersRef}>
        {CARDS}
      </div>
      <button
        className="slider__nav next"
        onClick={() => onNavigate('forward')}
      >
        <span className="icon">
          {/* &gt; */}
          <ArrowForwardIcon />
        </span>
        {/* <span className="row__gradient" /> */}
      </button>
    </StyledRow>
  );
}
