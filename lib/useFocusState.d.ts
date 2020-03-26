import { NativeSyntheticEvent, TextInputFocusEventData, TextInputProps } from 'react-native';
declare const useFocusState: ({ onBlur, onFocus, }: Pick<TextInputProps, "onBlur" | "onFocus">) => [boolean, (e: NativeSyntheticEvent<TextInputFocusEventData>) => void, (e: NativeSyntheticEvent<TextInputFocusEventData>) => void];
export default useFocusState;
