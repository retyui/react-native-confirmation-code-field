import {useCallback, useDebugValue, useState} from 'react';
import type {BlurEvent, FocusEvent, TextInputProps} from 'react-native';

export const useFocusState = (
  onBlur?: TextInputProps['onBlur'],
  onFocus?: TextInputProps['onFocus'],
) => {
  'use memo';

  const [isFocused, setFocusFlag] = useState(false);

  const handleBlur = useCallback(
    (e: BlurEvent) => {
      setFocusFlag(false);
      onBlur?.(e);
    },
    [onBlur],
  );

  const handleFocus = useCallback(
    (e: FocusEvent) => {
      setFocusFlag(true);
      onFocus?.(e);
    },
    [onFocus],
  );

  if (__DEV__) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useDebugValue(isFocused ? 'Focused' : 'Unfocused');
  }

  return [isFocused, handleFocus, handleBlur] as const;
};
