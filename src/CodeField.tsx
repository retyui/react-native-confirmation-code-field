import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewProps,
} from 'react-native';
import React, {ComponentType, ReactNode, Ref} from 'react';
import {getStyle, getSymbols} from './utils';
import {useFocusState} from './useFocusState';

import {styles} from './CodeField.styles';

export interface RenderCellOptions {
  symbol: string;
  index: number;
  isFocused: boolean;
}

type TextInputPropsWithoutStyle = Omit<TextInputProps, 'style'>;

export interface Props extends TextInputPropsWithoutStyle {
  renderCell: (options: RenderCellOptions) => ReactNode;
  RootProps?: ViewProps;
  RootComponent?: ComponentType<ViewProps>;
  rootStyle?: ViewProps['style'];
  textInputStyle?: StyleProp<TextStyle>;
  cellCount?: number;
}

const DEFAULT_CELL_COUNT = 4;

function CodeFieldComponent(
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
) {
  const focusState = useFocusState(onBlur, onFocus);
  const cells = getSymbols(value || '', cellCount).map(
    (symbol, index, symbols) => {
      const isFirstEmptySymbol = symbols.indexOf('') === index;

      return renderCell({
        index,
        symbol,
        isFocused: focusState.isFocused && isFirstEmptySymbol,
      });
    },
  );

  return (
    <RootComponent {...RootProps} style={getStyle(styles.root, rootStyle)}>
      {cells}
      <TextInput
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
        {...rest}
        value={value}
        onBlur={focusState.onBlur}
        onFocus={focusState.onFocus}
        style={getStyle(styles.textInput, textInputStyle)}
        ref={ref}
      />
    </RootComponent>
  );
}

export const CodeField = React.forwardRef(CodeFieldComponent);
