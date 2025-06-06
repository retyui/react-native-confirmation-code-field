import {useEffect} from 'react';

export function useInterval(callback: () => void, delay: number): void {
  'use memo';
  useEffect(
    function setIntervalEffect() {
      const timer = setInterval(callback, delay);
      return function cleanupIntervalTimer() {
        clearInterval(timer);
      };
    },
    [callback, delay],
  );
}

export function useTimeout(callback: () => void, delay: number): void {
  'use memo';
  useEffect(
    function setTimeoutEffect() {
      const timer = setTimeout(callback, delay);
      return function cleanupTimeoutTimer() {
        clearTimeout(timer);
      };
    },
    [callback, delay],
  );
}
