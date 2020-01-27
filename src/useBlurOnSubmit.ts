import { useRef } from "react";
import { TextInput } from "react-native";

type Options = {
  value?: string;
  cellCount: number;
};
const useBlurOnSubmit = ({ value, cellCount }: Options) => {
  const inputRef = useRef<TextInput>(null);

  if (value && value.length === cellCount) {
    const { current: inputInstance } = inputRef;

    if (inputInstance) {
      inputInstance.blur();
    }
  }

  return [inputRef];
};

export default useBlurOnSubmit;
