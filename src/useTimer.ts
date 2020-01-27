import { useCallback, useRef } from "react";

const useTimer = <Args extends Array<any>>(callback: (...a: Args) => any, delay: number, deps: Array<any>): [(...a: Args) => void, () => void] => {
  const timerRef = useRef<number>(0);
  const stop = useCallback(() => clearInterval(timerRef.current), []);
  const start = useCallback(
    (...args: Array<any>) => {
      stop();
      timerRef.current = setInterval(callback, delay, ...args);
    },
    // eslint-disable-next-line
    [delay, ...deps]
  );

  return [start, stop];
};

export default useTimer;
