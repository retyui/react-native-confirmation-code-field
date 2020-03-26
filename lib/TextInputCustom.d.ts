import React from 'react';
import { TextInputProps } from 'react-native';
export interface ITextInputCustomProps extends TextInputProps {
    ref: any;
}
declare const TextInputCustom: (props: ITextInputCustomProps) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
export default TextInputCustom;
