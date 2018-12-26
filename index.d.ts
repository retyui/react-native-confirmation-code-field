import * as React from 'react';
import * as ReactNative from 'react-native';

declare module 'react-native-confirmation-code-field' {
  export type InputPositions = 'left' | 'right' | 'center' | 'full-width';
  export type VariantNames =
    | 'border-box'
    | 'border-circle'
    | 'border-b'
    | 'border-b-t'
    | 'border-l-r'
    | 'clear';

  export interface ConfirmationCodeInputProps {
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

    onFulfill: (code: string) => void;
    onChangeCode?: (code: string) => void;

    inputProps?: (index: number) => ReactNative.TextInputProps;
    // Help set a custom style to any inputs
    inputStyle?: (
      index: number,
      isFocused: boolean,
      hasValue: boolean,
    ) => ReactNative.StyleProp<ReactNative.TextStyle>;
    containerProps?: ReactNative.ViewProps;

    testID?: any;
  }

  export default class ConfirmationCodeInput extends React.Component<
    ConfirmationCodeInputProps,
    {}
  > {
    clear(): void;
  }
}
