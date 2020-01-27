import { useState } from "react";
import { NativeSyntheticEvent, TextInputFocusEventData, TextInputProps } from "react-native";
import useEvent from "./useEvent";

const useFocusState = ({ onBlur, onFocus }: Pick<TextInputProps, "onBlur" | "onFocus">) => {
  const [isFocused, setFocusFlag] = useState(false);

  return [isFocused, useEvent<NativeSyntheticEvent<TextInputFocusEventData>>(onBlur, () => setFocusFlag(false)), useEvent<NativeSyntheticEvent<TextInputFocusEventData>>(onFocus, () => setFocusFlag(true))];
};

export default useFocusState;
