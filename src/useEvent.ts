import { useCallback } from "react";
import { NativeSyntheticEvent } from "react-native";

const useEvent = <Event extends NativeSyntheticEvent<any>>(nativeEvent: ((event: Event) => void) | undefined, customHandler: () => void) => {
  const handleOnEvent = useCallback(
    (event: Event) => {
      customHandler();

      if (nativeEvent) {
        nativeEvent(event);
      }
    },

    [nativeEvent]
  );
  return handleOnEvent;
};

export default useEvent;
