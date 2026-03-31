import {useEffect, useRef} from 'react';
import type {TextInput} from 'react-native';

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
