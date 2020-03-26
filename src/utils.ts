import { StyleProp } from 'react-native';

const truncateString = (codeValue: string, codeLength: number) => codeValue.substr(0, codeLength);

export const getSymbols = (codeValue: string, codeLength: number) => [...truncateString(codeValue, codeLength).split(''), ...new Array(codeLength).fill('')].slice(0, codeLength);

export const getStyle = (base: StyleProp<any>, custom?: StyleProp<any>) => (custom ? [base, custom] : base);

export const isLastFilledCell = ({ value, index }: { value: string; index: number }): boolean => Boolean(value && value.length - 2 === index);
