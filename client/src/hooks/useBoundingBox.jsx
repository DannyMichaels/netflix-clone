import { useRef, useState, useEffect } from 'react';

export const debounce = (callback, wait, timeoutId = null) => {
  const debounceFn = (...args) => {
    window.clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };

  debounceFn.cancel = () => window.clearTimeout(timeoutId);

  return debounceFn;
};

const useBoundingBox = (dependencies = []) => {
  // Our `ref` is needed to be passed to the component's `ref` attribute.
  // $FlowFixMe
  const ref = useRef(null);

  // We're using `useRef` for our boundingBox just as an instance variable.
  // Some bit of mutable state that doesn't require re-renders.
  const [boundingBox, setBoundingBox] = useState(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    setBoundingBox(ref.current.getBoundingClientRect());
  }, dependencies); // eslint-disable-line

  // We want to re-capture the bounding box whenever the user scrolls or
  // resizes the window.
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const recalculate = debounce(() => {
      if (ref.current) {
        setBoundingBox(ref.current.getBoundingClientRect());
      }
    }, 250);

    window.addEventListener('scroll', recalculate);
    window.addEventListener('resize', recalculate);

    return () => {
      window.removeEventListener('scroll', recalculate);
      window.removeEventListener('resize', recalculate);
    };
  }, []);

  return [ref, boundingBox];
};

export default useBoundingBox;
