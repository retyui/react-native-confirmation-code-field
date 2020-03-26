import { useCallback, useRef } from 'react';

type Options = {
  clear(id: number): void;
  runTimer(handler: (...args: any[]) => any, timeout: number, ...args: Array<any>): number;
};

const creteUseTimer = ({ clear, runTimer }: Options) => <Args extends Array<any>>(callback: (...a: Args) => any, delay: number, deps: Array<any>): [(...a: Args) => void, () => void] => {
  const timerRef = useRef<number>();
  const stop = useCallback(
    () =>
      clear(
        // @ts-ignore
        timerRef.current
      ),
    []
  );
  const start = useCallback(
    (...args: Array<any>) => {
      stop();
      timerRef.current = runTimer(callback, delay, ...args);
    },
    // eslint-disable-next-line
    [delay, ...deps]
  );

  return [start, stop];
};

export const useInterval = creteUseTimer({
  clear: clearInterval,
  runTimer: setInterval,
});

export const useTimeout = creteUseTimer({
  clear: clearTimeout,
  runTimer: setTimeout,
});
