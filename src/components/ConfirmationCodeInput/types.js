// @flow
import type { KeyboardType } from 'react-native/Libraries/Components/TextInput/TextInput';
import type { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes';

import type { VariantNames, InputPositions } from '../../types';

export type Props = $ReadOnly<{|
  // Required props
  onFulfill: (code: string) => void,

  // Not required props (rewritten in defaultProps)
  codeLength: number,
  defaultCode: ?string,

  activeColor: string,
  cellBorderWidth: number,
  inactiveColor: string,
  inputPosition: InputPositions,
  size: number,
  space: number,
  variant: VariantNames,
  keyboardType: KeyboardType,
  maskSymbol: ?string,

  autoFocus: boolean,

  onChangeCode: ?(code: string) => void,

  inputProps: Object,
  cellProps: ({
    index: number,
    isFocused: boolean,
    hasValue: boolean,
  }) => ?Object,
  containerProps: ViewProps,
  testID?: any,
|}>;

export type State = {|
  codeValue: string,
  isFocused: boolean,
|};

export type PropsTypeCustomValidatorFn = (
  props: Object,
  propName: string,
  componentName: string,
) => ?Error;
