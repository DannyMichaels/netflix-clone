import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import useBoundingBox from '@/hooks/useBoundingBox'; // hook to help get dimensions of elements with react (listens on resize too)
import { getRowMovies } from '@/services/movies';
import { MOVIES_PAINTED } from '@/reducers/moviesReducer/movieReducerTypes';
import { ProfilesStateContext } from '@/context/profiles/profilesContext';
import { MoviesDispatchContext } from '@/context/movies/moviesContext';

const ROW_TRANSITION_MS = 750;

export default function useMovieRow(fetchUrl, rowIndex) {
  const savedFetchUrl = useRef(fetchUrl);
  const savedRowIndex = useRef(rowIndex);
  const { currentProfile } = useContext(ProfilesStateContext); // current user profile
  const dispatch = useContext(MoviesDispatchContext);

  const [movies, setMovies] = useState([]); // the array of the movies in the row
  const [moviesUpdated, setMoviesUpdated] = useState(false); // value to be set when the dom finished painting and movies got cloned in the row
  const [unclonedMoviesCount, setUnclonedMoviesCount] = useState(0); // count of original movies that aren't cloned

  const [activeIndicatorNumber, rawSetActiveIndicatorNumber] = useState(0); // the current active indicator index
  const setActiveIndicatorNumber = (...args) => {
    //  a timeout to wait for the animation to end before changing the active indicator number.
    setTimeout(() => rawSetActiveIndicatorNumber(...args), ROW_TRANSITION_MS);
  };
  const [indicators, setIndicators] = useState([]); // array of indicators
  const [maxScrollPosition, setMaxScrollPosition] = useState(0); // the max indicator amount
  const [canScrollPrev, setCanScrollPrev] = useState(false); // a boolean for if a user can click back.

  const [containerWidth, setContainerWidth] = useState(0); // the width for .row__posters
  const [translateXValue, setTranslateXValue] = useState(0); // state for translateX css property

  const [skipTransition, setSkipTransition] = useState(false); // a boolean for when to have transition css set to null (to fix snappy transition on certain condition)
  const [isAnimating, setIsAnimating] = useState(false); // state for when the row transition css is in action, used to stop user from spam clicking next.
  let timeoutInProgress = useRef(false); // a boolean for if timeout is im progress, used to stop user from spam clicking next or back in certain conditions

  const [rowRef, rowDimensions] = useBoundingBox(); // reference for the row parent container.
  const [postersRef, posterDimensions] = useBoundingBox('.row__poster');
  const [nextButtonRef, sliderButtonDimensions] = useBoundingBox(); // reference for the next button.

  useEffect(() => {
    savedRowIndex.current = rowIndex;
  }, [rowIndex]);

  useEffect(() => {
    savedFetchUrl.current = fetchUrl;
  }, [fetchUrl]);

  const posterWidth = useMemo(
    () => posterDimensions?.width ?? 0,
    [posterDimensions?.width]
  );

  const sliderButtonWidth = useMemo(
    () => sliderButtonDimensions?.width ?? 0,
    [sliderButtonDimensions?.width]
  );

  let visiblePosterCount = useMemo(
    // number of amount of movies a user can see, changes on resize
    () =>
      Math.round(
        (rowDimensions?.width - 2 * sliderButtonWidth) / posterWidth
      ) ?? 0,

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [posterDimensions, sliderButtonDimensions, rowDimensions]
  );

  const createPaginationIndicators = useCallback(
    (num) => {
      if (num) return setIndicators([...new Array(num).keys()]);
      if (!isNaN(maxScrollPosition) && maxScrollPosition > 0) {
        setIndicators([...new Array(maxScrollPosition).keys()]);
        return;
      }
    },
    [maxScrollPosition]
  );

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await getRowMovies(
        savedFetchUrl.current,
        currentProfile?.isKid
      );
      const moviesThatHaveImage = movieData.filter(({ backdrop_path }) =>
        Boolean(backdrop_path)
      );

      setUnclonedMoviesCount(moviesThatHaveImage.length); // set the original uncloned movies count.
      setMovies(moviesThatHaveImage);
    };
    fetchData();
  }, [currentProfile?.isKid]);

  // eslint-disable-next-line
  useLayoutEffect(() => {
    // create clones of movies after dom has painted
    // check if movies loaded
    let result = movies?.length === unclonedMoviesCount;

    if (result && result !== 0) {
      const previousMoviesState = [...movies];
      const newMoviesState = [...movies];

      // get visible poster amount

      // create pagination indicators
      let maxScrollPos = Math.floor(unclonedMoviesCount / visiblePosterCount);
      setMaxScrollPosition(Number(maxScrollPos));
      createPaginationIndicators(maxScrollPos);

      //  add new cloned movies to end of array
      for (let i = 0; i < visiblePosterCount; i++) {
        newMoviesState.push(previousMoviesState[i]);
      }

      // add new cloned movies to beginning of array
      for (
        let i = previousMoviesState.length - 1;
        i > previousMoviesState.length - 1 - visiblePosterCount;
        i--
      ) {
        newMoviesState.unshift(previousMoviesState[i]);
      }

      setContainerWidth(newMoviesState.length * posterWidth);
      setTranslateXValue(-visiblePosterCount * posterWidth); // set the initial translateX css
      setMovies(newMoviesState);
      setMoviesUpdated(savedRowIndex.current);
    }
  }, [visiblePosterCount, unclonedMoviesCount]);

  useEffect(() => {
    // fake loading to not let the user see the akwardness of cloning the elements.
    if (savedRowIndex.current === 7 && moviesUpdated === 7) {
      setTimeout(() => {
        dispatch({ type: MOVIES_PAINTED, payload: true });
      }, 500);
    }

    // eslint-disable-next-line
  }, [moviesUpdated]);

  useEffect(() => {
    if (skipTransition) {
      setTimeout(() => {
        setIsAnimating(false);
        setSkipTransition(false);
      }, 10);
    }
  }, [skipTransition]);

  // change these when user resizes
  useEffect(() => {
    const initialTranslateXValue = -posterWidth * visiblePosterCount;

    setTranslateXValue((prevState) => {
      // this is so when user resizes but on different indicator number, reset to 0, reset translateX to initial.
      // maybe there's a more elegant solution to keep it where it is without losing indicator number
      if (prevState === initialTranslateXValue) return prevState;
      return initialTranslateXValue;
    });
    setActiveIndicatorNumber(0);
  }, [posterWidth, visiblePosterCount]);

  useEffect(() => {
    if (moviesUpdated === savedRowIndex.current) {
      setContainerWidth(movies.length * posterWidth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesUpdated, posterWidth]);

  useEffect(() => {
    let maxScrollPos = Math.floor(unclonedMoviesCount / visiblePosterCount);
    setMaxScrollPosition(Number(maxScrollPos));
    createPaginationIndicators(maxScrollPos);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posterWidth, unclonedMoviesCount, visiblePosterCount]);

  // onNavigate, function runs when user clicks slider next or prev button
  const onNavigate = useCallback(
    (direction) => {
      if (timeoutInProgress.current) return;
      if (isAnimating === savedRowIndex.current) return;

      const initialTranslateXValue = -posterWidth * visiblePosterCount;
      const lastAllowedUnclonedPoster = unclonedMoviesCount * -posterWidth;
      // const lastAllowedPoster = lastAllowedUnclonedPoster + initialTranslateXValue;

      setCanScrollPrev(savedRowIndex.current); // makes us able to scroll left after scrolling forward for the first time (just like netflix)
      setIsAnimating(savedRowIndex.current); // stops user from spam clicking next or prev button

      if (direction === 'forward') {
        // for going forward
        let translateXNext = translateXValue - posterWidth * visiblePosterCount; // newState = prevState - posterWidth * visiblePosterCount

        if (translateXNext < lastAllowedUnclonedPoster) {
          timeoutInProgress.current = true;

          setActiveIndicatorNumber(0);

          setTimeout(() => {
            setSkipTransition(true);
            setTranslateXValue(initialTranslateXValue);
            timeoutInProgress.current = false;
          }, ROW_TRANSITION_MS); // the timeout that once ends will go back to initial translateX value, can be snappy and ugly if doesn't work

          setTranslateXValue(translateXNext);
        } else {
          setActiveIndicatorNumber((prev) => (prev += 1));
          setTimeout(() => setIsAnimating(false), ROW_TRANSITION_MS);

          setTranslateXValue(translateXNext);
        }
      } else {
        //  if clicking back
        let translateXBack = translateXValue + posterWidth * visiblePosterCount; // newState = prevState + posterWidth * visiblePosterCount

        if (translateXBack > initialTranslateXValue) {
          timeoutInProgress.current = true;

          setActiveIndicatorNumber(indicators.length - 1);

          setTimeout(() => {
            setSkipTransition(true);
            setTranslateXValue(lastAllowedUnclonedPoster);
            timeoutInProgress.current = false;
          }, ROW_TRANSITION_MS);

          setTranslateXValue(translateXBack);
        } else {
          setActiveIndicatorNumber((prev) => (prev -= 1));
          setTimeout(() => setIsAnimating(false), ROW_TRANSITION_MS);

          setTranslateXValue(translateXBack);
        }
      }
    },
    [
      indicators,
      translateXValue,
      posterWidth,
      visiblePosterCount,
      unclonedMoviesCount,
      isAnimating,
    ]
  );

  return {
    indicators,
    visiblePosterCount,
    sliderButtonWidth,
    posterWidth,
    rowRef,
    postersRef,
    nextButtonRef,
    containerWidth,
    canScrollPrev,
    activeIndicatorNumber,
    unclonedMoviesCount,
    moviesUpdated,
    movies,
    onNavigate,
    translateXValue,
    timeoutInProgress,
    isAnimating,
    skipTransition,
  };
}