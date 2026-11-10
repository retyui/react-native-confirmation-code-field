import {useEffect} from 'react';

export const useInterval = (callback: () => void, delay: number): void => {
  'use memo';
  useEffect(() => {
    const id = setInterval(callback, delay);
    return () => clearInterval(id);
  }, [callback, delay]);
};

export const useTimeout = (callback: () => void, delay: number): void => {
  'use memo';
  useEffect(() => {
    const id = setTimeout(callback, delay);
    return () => clearTimeout(id);
  }, [callback, delay]);
};
