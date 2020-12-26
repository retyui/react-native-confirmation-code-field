import {useCallback} from 'react';
import {NativeSyntheticEvent} from 'react-native';

export const useEvent = <Event extends NativeSyntheticEvent<any>>(
  nativeEvent: ((event: Event) => void) | undefined,
  customHandler: () => void,
): ((e: Event) => void) =>
  useCallback(
    (event: Event) => {
      customHandler();

      if (typeof nativeEvent === 'function') {
        nativeEvent(event);
      }
    },

    [nativeEvent],
  );
