import {useRef, useEffect} from 'react';
import {TextInput} from 'react-native';

interface Options {
  value?: string;
  cellCount: number;
}

export const useBlurOnFulfill = ({value, cellCount}: Options) => {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (value && value.length === cellCount) {
      const inputInstance = inputRef.current;

      if (inputInstance) {
        inputInstance.blur();
      }
    }
  }, [value, cellCount]);

  return inputRef;
};
