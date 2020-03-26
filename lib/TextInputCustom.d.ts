import React from 'react';
import { GestureResponderEvent, TextInputProps } from 'react-native';
export interface ITextInputCustomProps extends TextInputProps {
    ref: any;
    onPress?: (event: GestureResponderEvent) => void;
}
declare const TextInputCustom: (props: ITextInputCustomProps) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
export default TextInputCustom;
