import {
  ComponentPropsWithRef,
  ComponentType,
  ElementType,
  FC,
  JSX,
  ReactNode,
  Ref,
} from 'react';
import type {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewProps,
} from 'react-native';
import {Platform, TextInput, View} from 'react-native';

import {styles} from './CodeField.styles';
import {useFocusState} from './useFocusState';
import {getSymbols} from './utils';

export interface RenderCellOptions {
  symbol: string;
  index: number;
  /** The input is focused and this is the cell the next symbol goes into */
  isFocused: boolean;
  /** The input is focused (true for every cell, also when the code is complete) */
  isFieldFocused: boolean;
  /** The cell has a symbol */
  isFilled: boolean;
  /** The cell before the last filled one; use it to mask the previous symbol as soon as a new one is typed */
  isPrevFilled: boolean;
  /** The last cell of the field */
  isLast: boolean;
}

interface BaseProps extends Omit<TextInputProps, 'style' | 'ref'> {
  renderCell: (options: RenderCellOptions) => ReactNode;
  RootProps?: ViewProps;
  RootComponent?: ComponentType<ViewProps>;
  rootStyle?: ViewProps['style'];
  textInputStyle?: StyleProp<TextStyle>;
  cellCount?: number;
}

export interface Props extends BaseProps {
  ref?: Ref<TextInput>;
}

// Based on: https://github.com/mui/material-ui/blob/c3d02722da19e3bcb9b97eb640c21475fecd501c/packages/mui-material/src/OverridableComponent/index.ts#L10
export interface CodeFieldOverridableComponent extends FC<Props> {
  // Overload for custom InputComponent to consume correct props (and ref)
  <TInput extends ElementType>(
    props: {InputComponent: TInput} & Omit<
      ComponentPropsWithRef<TInput>,
      'style'
    > &
      BaseProps,
  ): JSX.Element | null;
}

const DEFAULT_CELL_COUNT = 4;
const autoComplete = Platform.select({
  android: 'sms-otp',
  default: 'one-time-code',
});

export const CodeField: CodeFieldOverridableComponent = ({
  textInputStyle,
  value,
  renderCell,
  cellCount = DEFAULT_CELL_COUNT,
  rootStyle,
  RootProps,
  RootComponent = View,
  InputComponent = TextInput,
  ref,
  ...rest
}: Props & {InputComponent?: ComponentType<any>}) => {
  'use memo';
  const [isFocused, onFocus, onBlur] = useFocusState(rest.onBlur, rest.onFocus);

  const code = value || '';
  const activeIndex = code.length;
  const symbols = getSymbols(code, cellCount);
  const cells = symbols.map((symbol, index) =>
    renderCell({
      index,
      symbol,
      isFocused: isFocused && index === activeIndex,
      isFieldFocused: isFocused,
      isFilled: symbol !== '',
      isPrevFilled: index === code.length - 2,
      isLast: index === cellCount - 1,
    }),
  );

  return (
    <RootComponent
      {...RootProps}
      style={rootStyle ? [styles.root, rootStyle] : styles.root}
    >
      {cells}
      <InputComponent
        disableFullscreenUI
        // Use `caretHidden={false}` when `value={''}` and user can't paste\copy text because menu doesn't appear
        // See more: https://github.com/retyui/react-native-confirmation-code-field/issues/140
        caretHidden={true}
        spellCheck={false}
        autoCorrect={false}
        submitBehavior="submit"
        clearButtonMode="never"
        keyboardType="number-pad"
        maxLength={cellCount}
        underlineColorAndroid="transparent"
        autoComplete={autoComplete}
        {...rest}
        value={value}
        onBlur={onBlur}
        onFocus={onFocus}
        style={
          textInputStyle ? [styles.textInput, textInputStyle] : styles.textInput
        }
        ref={ref}
      />
    </RootComponent>
  );
};

CodeField.displayName = 'CodeField';
