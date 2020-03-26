import { TextInputProps } from 'react-native';
export interface ITextInputCustomProps extends TextInputProps {
    ref: any;
}
declare const TextInputCustom: (props: ITextInputCustomProps) => any;
export default TextInputCustom;
