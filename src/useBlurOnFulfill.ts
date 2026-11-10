import type {RefObject} from 'react';
import {useEffect, useRef} from 'react';
import type {TextInput} from 'react-native';

interface Options {
  value?: string;
  cellCount: number;
}

export const useBlurOnFulfill = <TInput extends TextInput>({
  value,
  cellCount,
}: Options): RefObject<TInput | null> => {
  'use memo';
  const inputRef = useRef<TInput | null>(null);

  useEffect(() => {
    if (value?.length === cellCount) {
      inputRef.current?.blur();
    }
  }, [value, cellCount]);

  return inputRef;
};
