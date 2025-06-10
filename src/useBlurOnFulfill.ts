import type {TextInput} from 'react-native';
import {useRef, useEffect} from 'react';

interface Options {
  value?: string;
  cellCount: number;
}

export function useBlurOnFulfill<TInput extends TextInput>({
  value,
  cellCount,
}: Options) {
  'use memo';
  const inputRef = useRef<TInput | null>(null);

  useEffect(
    function blurOnFulfillEffect() {
      if (value?.length === cellCount) {
        inputRef.current?.blur();
      }
    },
    [value, cellCount],
  );

  return inputRef;
}
