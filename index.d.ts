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
  ) => ReactNative.TextProps | void;

  export interface ConfirmationCodeInputProps {
    onFulfill: (code: string) => void;

    codeLength?: number;
    defaultCode?: string;

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
    canPasteCode?: boolean;

    cellProps?: ReactNative.TextProps | CellPropsFn;
    inputProps?: ReactNative.TextInputProps;
    containerProps?: ReactNative.ViewProps;

    testID?: any;
  }

  export default class ConfirmationCodeInput extends React.Component<
    ConfirmationCodeInputProps,
    {}
  > {
    clear(): void;
    focus(): void;
    blur(): void;
  }
}
