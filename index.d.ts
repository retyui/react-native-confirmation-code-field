import * as React from 'react';
import * as ReactNative from 'react-native';

declare module 'react-native-confirmation-code-field' {
  export type InputPositions = 'left' | 'right' | 'center' | 'full-width';

  export type VariantNames =
    | 'border-box'
    | 'border-circle'
    | 'border-b'
    | 'clear';

  export type CellPropsOptions = {
    index: number;
    isFocused: boolean;
    hasValue: boolean;
  };

  export type CellPropsFn = (
    options: CellPropsOptions,
  ) => ReactNative.TextInputProps | void | null;

  export interface ConfirmationCodeInputProps {
    onFulfill: (code: string) => void;

    codeLength?: number;
    defaultCode?: string;
    normalizeCode?: (code: string) => string;

    CellComponent?: React.ComponentType<any>;
    activeColor?: string;
    cellBorderWidth?: number;
    inactiveColor?: string;
    inputPosition?: InputPositions;
    size?: number;
    space?: number;
    variant?: VariantNames;
    keyboardType?: ReactNative.KeyboardTypeOptions;
    maskSymbol?: string;

    autoFocus?: boolean;
    blurOnSubmit?: boolean;

    cellProps?: ReactNative.TextInputProps | CellPropsFn;
    inputProps?: Omit<
      ReactNative.TextInputProps,
      'autoFocus' | 'keyboardType' | 'value'
    >;
    containerProps?: ReactNative.ViewProps;

    testID?: any;
  }

  export interface ConfirmationCodeInputState {
    isFocused: boolean;
    codeValue: string;
  }

  export default class ConfirmationCodeInput extends React.Component<
    ConfirmationCodeInputProps,
    ConfirmationCodeInputState
  > {
    clear(): void;
    focus(): void;
    blur(): void;
    handlerOnTextChange(text: string): void;
  }
}
