import {useState} from 'react';
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import {useEvent} from './useEvent';

interface HookResult {
  isFocused: boolean;
  onBlur: Exclude<TextInputProps['onBlur'], undefined>;
  onFocus: Exclude<TextInputProps['onFocus'], undefined>;
}

export const useFocusState = (
  onBlur?: TextInputProps['onBlur'],
  onFocus?: TextInputProps['onFocus'],
): HookResult => {
  const [isFocused, setFocusFlag] = useState(false);

  return {
    isFocused,
    onBlur: useEvent<NativeSyntheticEvent<TextInputFocusEventData>>(
      onBlur,
      () => setFocusFlag(false),
    ),
    onFocus: useEvent<NativeSyntheticEvent<TextInputFocusEventData>>(
      onFocus,
      () => setFocusFlag(true),
    ),
  };
};
