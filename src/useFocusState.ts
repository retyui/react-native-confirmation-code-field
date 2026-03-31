import {useCallback, useDebugValue, useState} from 'react';
import type {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';

export function useFocusState(
  onBlurFromProps?: TextInputProps['onBlur'],
  onFocusFromProps?: TextInputProps['onFocus'],
) {
  'use memo';

  const [isFocused, setFocusFlag] = useState(false);

  const onBlur = useCallback(
    function onInputBlur(
      blurEvent: NativeSyntheticEvent<TextInputFocusEventData>,
    ) {
      setFocusFlag(false);
      onBlurFromProps?.(blurEvent);
    },
    [onBlurFromProps],
  );

  const onFocus = useCallback(
    function onInputFocus(
      focusEvent: NativeSyntheticEvent<TextInputFocusEventData>,
    ) {
      setFocusFlag(true);
      onFocusFromProps?.(focusEvent);
    },
    [onFocusFromProps],
  );

  useDebugValue(isFocused ? 'Focused' : 'Unfocused');

  return [isFocused, onFocus, onBlur] as const;
}
