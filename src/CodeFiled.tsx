import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import React, {ComponentType, forwardRef, ReactElement, Ref} from 'react';
import {getStyle, getSymbols} from './utils';
import TextInputCustom from './TextInputCustom';
import useFocusState from './useFocusState';

import styles from './CodeFiled.styles';

type Props = {
  rootStyle?: StyleProp<any>;
  textInputStyle?: StyleProp<TextStyle>;
  RootProps?: {};
  RootComponent?: ComponentType<any>;

  cellCount?: number;
  renderCell: (options: {
    symbol: string;
    index: number;
    isFocused: boolean;
  }) => ReactElement<any, any>;
} & Omit<TextInputProps, 'style'>;

const DEFAULT_CELL_COUNT = 4;

const CodeFiled = (
  {
    rootStyle,
    textInputStyle,
    onBlur,
    onFocus,
    value,
    renderCell,
    cellCount = DEFAULT_CELL_COUNT,
    RootProps = {},
    RootComponent = View,
    ...rest
  }: Props,
  ref: Ref<TextInput>,
) => {
  const [isFocused, handleOnBlur, handleOnFocus] = useFocusState({
    onBlur,
    onFocus,
  });
  const cells = getSymbols(value || '', cellCount).map(
    (symbol, index, symbols) => {
      const isFirstEmptySymbol = symbols.indexOf('') === index;

      return renderCell({
        index,
        symbol,
        isFocused: isFocused && isFirstEmptySymbol,
      });
    },
  );

  return (
    <RootComponent {...RootProps} style={getStyle(styles.root, rootStyle)}>
      {cells}
      <TextInputCustom
        {...rest}
        // @ts-ignore
        ref={ref}
        value={value}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        style={getStyle(styles.textInput, textInputStyle)}
        maxLength={cellCount}
      />
    </RootComponent>
  );
};

export default forwardRef(CodeFiled);
