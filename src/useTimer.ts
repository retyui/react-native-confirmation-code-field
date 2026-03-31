import {useEffect} from 'react';

export const useInterval = (callback: () => void, delay: number): void => {
  'use memo';
  useEffect(() => {
    const timer = setInterval(callback, delay);
    return () => clearInterval(timer);
  }, [callback, delay]);
};

export const useTimeout = (callback: () => void, delay: number): void => {
  'use memo';
  useEffect(() => {
    const timer = setTimeout(callback, delay);
    return () => clearTimeout(timer);
  }, [callback, delay]);
};
