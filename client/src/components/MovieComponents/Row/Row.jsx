import {
  Children,
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
  useLayoutEffect,
} from 'react';
import useResize from '../../../hooks/useResize';

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
import { ProfilesStateContext } from '../../../context/profiles/profilesContext';

const FALLBACK_POSTER_IMG =
  'https://image.tmdb.org/t/p/original/fl6S0hvaYvFeRYGniMm9KzNg3AN.jpg';

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
  const [visiblePosterCount, setVisiblePosterCount] = useState(0);

  const [posterWidth, setPosterWidth] = useState(0);
  const [moviesUpdated, setMoviesUpdated] = useState(false);
  const { currentProfile } = useContext(ProfilesStateContext);

  const postersRef = useRef(null);
  const rowRef = useRef(null);

  const changeMaxScrollPosition = useCallback(() => {
    let allPosters = rowRef.current.querySelectorAll('.movie__card--parent');
    setMaxScrollPosition(
      Math.round(
        allPosters.length / (document.body.clientWidth / posterWidth) + 1
      )
    );
  }, [posterWidth]);

  const createIndicators = useCallback(() => {
    if (maxScrollPosition) {
      setIndicators([...new Array(maxScrollPosition).keys()]);
    }
  }, [maxScrollPosition]);

  const getPosterWidth = useCallback(() => {
    let posterWideness = Math.round(
      postersRef?.current
        ?.querySelector('.row__poster')
        ?.getBoundingClientRect()?.width
    );

    setPosterWidth(posterWideness);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await getAllMovies(fetchUrl, currentProfile?.isKid);
      const moviesThatHaveImage = movieData.filter(({ backdrop_path }) =>
        Boolean(backdrop_path)
      );

      setUnclonedMoviesCount(moviesThatHaveImage.length);

      setMovies(moviesThatHaveImage);
    };
    fetchData();
  }, [fetchUrl, currentProfile?.isKid]);

  useEffect(() => {
    let result = movies?.length === unclonedMoviesCount;

    if (result && result !== 0) {
      const copy = [...movies];
      const newMovies = [...movies];

      let posterWideness = Math.round(
        postersRef?.current
          ?.querySelector('.row__poster')
          ?.getBoundingClientRect()?.width
      );
      console.log({ posterWideness });

      setPosterWidth(posterWideness);

      let visiblePosterAmount = Math.round(
        rowRef?.current?.clientWidth / posterWideness
      );
      console.log({ visiblePosterAmount });
      setVisiblePosterCount(visiblePosterAmount);

      for (let i = 0; i < visiblePosterAmount; i++) {
        newMovies.push(copy[i]);
      }

      for (
        let i = copy.length - 1;
        i > copy.length - 1 - visiblePosterAmount;
        i--
      ) {
        newMovies.unshift(copy[i]);
      }

      setMoviesLength(newMovies.length * posterWideness);
      setTranslateXValue(-visiblePosterAmount * posterWideness);
      setMoviesUpdated(true);
      setMovies(newMovies);

      console.log('UPDATED!');
    }
  });

  useEffect(() => {
    changeMaxScrollPosition();
    createIndicators();
  }, [changeMaxScrollPosition, createIndicators]);

  useEffect(() => {
    if (movies.length) {
      getPosterWidth();
      changeMaxScrollPosition();
      createIndicators();
    }
  }, [movies, changeMaxScrollPosition, createIndicators, getPosterWidth]);

  useResize(changeMaxScrollPosition);
  useResize(getPosterWidth);

  const onNavigate = (direction) => {
    const initial = -posterWidth * visiblePosterCount;
    const actualLast = unclonedMoviesCount * -posterWidth;
    const lastAllowedPoster = actualLast + initial;

    setCanScrollPrev(rowIndex); // makes us able to scroll left after scrolling forward for the first time (just like netflix)

    if (direction === 'forward') {
      setTranslateXValue((prevState) => {
        let translateX = prevState - posterWidth * visiblePosterCount;
        if (translateX < lastAllowedPoster) {
          return initial;
        } else {
          return translateX;
        }
      });

      // the active index lines have to be refactored for this infinite scroll
      if (activeIndex === maxScrollPosition) return;
      setActiveIndex((prev) => (prev += 1));
    } else {
      setTranslateXValue((prevState) => {
        let translateX = prevState + posterWidth * visiblePosterCount;
        if (translateX > initial) {
          return actualLast;
        } else {
          return translateX;
        }
      });

      if (activeIndex > 0) {
        // active index is for the little indicators at the top right
        setActiveIndex((prev) => (prev -= 1));
      }
    }
  };

  const CARDS =
    movies.length > 0 ? (
      Children.toArray(
        movies?.map(
          (movie, idx) =>
            movie && (
              <MovieCard
                index={idx}
                movie={movie}
                src={`${baseImgUrl}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                isLargeRow={isLargeRow}
                alt={movie.name}
                className={`row__poster ${isLargeRow && 'row__posterLarge'} ${
                  idx < visiblePosterCount ||
                  (idx > movies.length - visiblePosterCount - 1 &&
                    idx < movies.length)
                    ? 'cloned'
                    : ''
                }`}
              />
            )
        )
      )
    ) : (
      <MovieCard
        index={0}
        movie={{
          name: 'test',
          id: 0,
          genre_ids: [10749, 16, 18],
        }}
        src={FALLBACK_POSTER_IMG}
        isLargeRow={isLargeRow}
        alt={'test'}
        key={'test' + 0}
        className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
      />
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
              key={idx}
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
            <ArrowBackIcon />
          </span>
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
          <ArrowForwardIcon />
        </span>
      </button>
    </StyledRow>
  );
}
