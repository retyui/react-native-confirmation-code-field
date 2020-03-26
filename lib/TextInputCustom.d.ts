import React from 'react';
import { GestureResponderEvent, TextInputProps } from 'react-native';
export interface ITextInputCustomProps extends TextInputProps {
    ref: any;
    onPress?: (event: GestureResponderEvent) => void;
}
declare const TextInputCustom: React.ForwardRefExoticComponent<React.PropsWithoutRef<ITextInputCustomProps> & React.RefAttributes<unknown>>;
export default TextInputCustom;
