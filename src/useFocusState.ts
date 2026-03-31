import {useCallback, useDebugValue, useState} from 'react';
import type {BlurEvent, FocusEvent, TextInputProps} from 'react-native';

export const useFocusState = (
  onBlurFromProps?: TextInputProps['onBlur'],
  onFocusFromProps?: TextInputProps['onFocus'],
) => {
  'use memo';

  const [isFocused, setFocusFlag] = useState(false);

  const onBlur = useCallback(
    (blurEvent: BlurEvent) => {
      setFocusFlag(false);
      onBlurFromProps?.(blurEvent);
    },
    [onBlurFromProps],
  );

  const onFocus = useCallback(
    (focusEvent: FocusEvent) => {
      setFocusFlag(true);
      onFocusFromProps?.(focusEvent);
    },
    [onFocusFromProps],
  );

  if (__DEV__) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useDebugValue(isFocused ? 'Focused' : 'Unfocused');
  }

  return [isFocused, onFocus, onBlur] as const;
};
