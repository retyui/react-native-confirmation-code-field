import {StyleProp, TextStyle} from 'react-native';

const truncateString = (codeValue: string, codeLength: number): Array<string> =>
  codeValue.substr(0, codeLength).split('');

const emptySymbols = (codeLength: number) =>
  new Array<string>(codeLength).fill('');

export const getSymbols = (codeValue: string, codeLength: number) =>
  new Array<string>()
    .concat(truncateString(codeValue, codeLength))
    .concat(emptySymbols(codeLength))
    .slice(0, codeLength);

export const getStyle = (
  base: StyleProp<TextStyle>,
  custom?: StyleProp<TextStyle>,
) => (custom ? [base, custom] : base);

interface Params {
  value: string;
  index: number;
}

export const isLastFilledCell = ({value, index}: Params): boolean =>
  Boolean(value && value.length - 2 === index);
