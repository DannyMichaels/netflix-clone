// optimize input onChange event for heavy rerender
export const debounce = (
  callback: () => void,
  wait: number,
  timeoutId = null as unknown
) => {
  const debounceFn = (...args: []) => {
    window.clearTimeout(timeoutId as number);

    timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, wait) as number;
  };

  debounceFn.cancel = () => window.clearTimeout(timeoutId as number);

  return debounceFn;
};
