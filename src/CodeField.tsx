import type {StyleProp, TextStyle, ViewProps} from 'react-native';
import {Platform, View, TextInput} from 'react-native';
import {
  ComponentPropsWithRef,
  ComponentType,
  ElementType,
  ReactNode,
  ForwardedRef,
} from 'react';
import React, {forwardRef} from 'react';

import {getSymbols} from './utils';
import {useFocusState} from './useFocusState';

import {styles} from './CodeField.styles';

export interface RenderCellOptions {
  symbol: string;
  index: number;
  isFocused: boolean;
}

type OmitStyle<T extends {style?: any}> = Omit<T, 'style'>;

interface BaseProps {
  renderCell: (options: RenderCellOptions) => ReactNode;
  RootProps?: ViewProps;
  RootComponent?: ComponentType<ViewProps>;
  rootStyle?: ViewProps['style'];
  textInputStyle?: StyleProp<TextStyle>;
  cellCount?: number;
}

const DEFAULT_CELL_COUNT = 4;
const autoComplete = Platform.select({
  android: 'sms-otp',
  default: 'one-time-code',
});

function CodeFieldComponent(
  {
    rootStyle,
    textInputStyle,
    value,
    renderCell,
    cellCount = DEFAULT_CELL_COUNT,
    RootProps,
    RootComponent = View,
    InputComponent = TextInput,
    ...rest
  }: Props & {InputComponent?: ComponentType<any>},
  ref: ForwardedRef<TextInput>,
) {
  'use memo';
  const [isFocused, onFocus, onBlur] = useFocusState(rest.onBlur, rest.onFocus);

  const symbols = getSymbols(value || '', cellCount);
  const cells = symbols.map((symbol, index, symbols) => {
    const isFirstEmptySymbol = symbols.indexOf('') === index;
    return renderCell({
      index,
      symbol,
      isFocused: isFocused && isFirstEmptySymbol,
    });
  });

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
        blurOnSubmit={false}
        clearButtonMode="never"
        autoCapitalize="characters"
        underlineColorAndroid="transparent"
        maxLength={cellCount}
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
}

CodeFieldComponent.displayName = 'CodeField';

export interface Props
  extends BaseProps,
    OmitStyle<ComponentPropsWithRef<typeof TextInput>> {
  //
}

// Based on: https://github.com/mui/material-ui/blob/c3d02722da19e3bcb9b97eb640c21475fecd501c/packages/mui-material/src/OverridableComponent/index.ts#L10
export interface CodeFieldOverridableComponent {
  // Overload for custom InputComponent to consume correct props
  <TInput extends ElementType>(
    props: {InputComponent: TInput} & OmitStyle<ComponentPropsWithRef<TInput>> &
      BaseProps,
  ): React.JSX.Element | null;

  // Default overload with TextInput
  (props: Props): React.JSX.Element | null;
}

export const CodeField = forwardRef(
  CodeFieldComponent,
) as CodeFieldOverridableComponent;
