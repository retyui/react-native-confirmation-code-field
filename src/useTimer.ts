import {useEffect, useRef} from 'react';

type ClearTimerFn = (id: number | undefined) => void;
type RunTimerFn = (handler: () => void, timeout: number) => number;

const creteUseTimer =
  (clear: ClearTimerFn, runTimer: RunTimerFn) =>
  (callback: () => void, delay: number): void => {
    const timerRef = useRef<number>(undefined);

    useEffect(() => {
      const stop = () => clear(timerRef.current);

      stop();

      timerRef.current = runTimer(callback, delay);

      return stop;
    }, [delay]);
  };

export const useInterval = creteUseTimer(
  clearInterval as ClearTimerFn,
  setInterval,
);
export const useTimeout = creteUseTimer(
  clearTimeout as ClearTimerFn,
  setTimeout,
);
