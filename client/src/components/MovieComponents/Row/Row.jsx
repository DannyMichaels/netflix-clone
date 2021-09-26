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
import useBoundingBox from './../../../hooks/useBoundingBox';

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

  const [skipTransition, setSkipTransition] = useState(false);
  const [posterWidth, setPosterWidth] = useState(0);
  const [moviesUpdated, setMoviesUpdated] = useState(false);
  const { currentProfile } = useContext(ProfilesStateContext);
  const [moviesLoaded, setMoviesLoaded] = useState(false);

  const postersRef = useRef(null);
  const rowRef = useRef(null);
  let timeoutInProgress = useRef(false);

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
      setMoviesLoaded(rowIndex);
    };
    fetchData();
  }, [fetchUrl, currentProfile?.isKid, rowIndex]);

  useLayoutEffect(() => {
    if (moviesLoaded === rowIndex) {
      const previousMoviesState = [...movies];
      const newMoviesState = [...movies];

      let posterWideness = Math.round(
        postersRef?.current
          ?.querySelector('.row__poster')
          ?.getBoundingClientRect()?.width
      );

      setPosterWidth(posterWideness);

      let visiblePosterAmount = Math.round(
        rowRef?.current?.clientWidth / posterWideness
      );

      setVisiblePosterCount(visiblePosterAmount);

      //  add to end of array
      for (let i = 0; i < visiblePosterAmount; i++) {
        newMoviesState.push(previousMoviesState[i]);
      }

      // add to beginning of array
      for (
        let i = previousMoviesState.length - 1;
        i > previousMoviesState.length - 1 - visiblePosterAmount;
        i--
      ) {
        newMoviesState.unshift(previousMoviesState[i]);
      }

      setMoviesLength(newMoviesState.length * posterWideness);
      setTranslateXValue(-visiblePosterAmount * posterWideness);
      setMoviesUpdated(true);
      setMovies(newMoviesState);

      console.log('UPDATED!');
    }
  }, [moviesLoaded, rowIndex]);

  useEffect(() => {
    if (skipTransition) {
      setTimeout(() => {
        setSkipTransition(false);
      }, 10);
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

  useResize(() => {
    let visiblePosterAmount = Math.round(
      rowRef?.current?.clientWidth / posterWidth
    );
    setVisiblePosterCount(visiblePosterAmount);
  });

  const onNavigate = (direction) => {
    if (timeoutInProgress.current) return;

    const initial = -posterWidth * visiblePosterCount;
    const lastAllowedUnclonedPoster = unclonedMoviesCount * -posterWidth;
    // const lastAllowedPoster = lastAllowedUnclonedPoster + initial;

    setCanScrollPrev(rowIndex); // makes us able to scroll left after scrolling forward for the first time (just like netflix)

    if (direction === 'forward') {
      // for going forward
      setTranslateXValue((prevState) => {
        let translateX = prevState - posterWidth * visiblePosterCount;
        if (translateX < lastAllowedUnclonedPoster) {
          console.log('SKIPPING TRANSITION');

          timeoutInProgress.current = true;

          setTimeout(() => {
            console.log('timeout called');
            setSkipTransition(true);
            setTranslateXValue(initial);
            timeoutInProgress.current = false;
          }, 750);

          setActiveIndex(0);

          return translateX;
        } else {
          setActiveIndex((prev) => (prev += 1));

          return translateX;
        }
      });
    } else {
      //  for going back
      setTranslateXValue((prevState) => {
        let translateX = prevState + posterWidth * visiblePosterCount;

        if (translateX > initial) {
          timeoutInProgress.current = true;

          setTimeout(() => {
            console.log('timeout called');
            setSkipTransition(true);
            setTranslateXValue(lastAllowedUnclonedPoster);
            timeoutInProgress.current = false;
          }, 750);

          return translateX;
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
      skipTransition={skipTransition}
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
          style={{ cursor: timeoutInProgress.current ? 'inherit' : 'pointer' }}
          disabled={timeoutInProgress.current}
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
        style={{ cursor: timeoutInProgress.current ? 'inherit' : 'pointer' }}
        disabled={timeoutInProgress.current}
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
