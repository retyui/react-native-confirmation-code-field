import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewProps,
} from 'react-native';
import React, {
  ComponentPropsWithRef,
  ComponentType,
  ElementType,
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
  RefAttributes,
} from 'react';
import {getStyle, getSymbols} from './utils';
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
  autoFocus?: boolean;
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
    InputComponent = TextInput,
    autoFocus = false,
    ...rest
  }: Props & {InputComponent?: ComponentType<any>},
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
      <InputComponent
        disableFullscreenUI
        // Use `caretHidden={false}` when `value={''}` and user can't paste\copy text because menu doesn't appear
        // See more: https://github.com/retyui/react-native-confirmation-code-field/issues/140
        caretHidden={true}
        spellCheck={false}
        autoCorrect={false}
        autoFocus={autoFocus}
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

export interface Props
  extends BaseProps,
    OmitStyle<TextInputProps>,
    RefAttributes<TextInput> {
  //
}

export interface CodeFieldOverridableComponent {
  <C extends ElementType>(
    props: {InputComponent: C} & OmitStyle<ComponentPropsWithRef<C>> &
      BaseProps,
  ): ReactElement;

  (props: Props): ReactElement;
}

export const CodeField = forwardRef(
  CodeFieldComponent,
) as CodeFieldOverridableComponent;
