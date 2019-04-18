// @flow
import { View, TextInput } from 'react-native';

import type { ElementConfig, ComponentType } from 'react';

export type TextInputProp = ElementConfig<typeof TextInput>;
export type ViewProps = ElementConfig<typeof View>;
export type KeyboardType = $PropertyType<TextInputProp, 'keyboardType'>;

import type { VariantNames, InputPositions } from '../../types';

export type CellPropsOptions = {|
  index: number,
  isFocused: boolean,
  hasValue: boolean,
|};

export type CellPropsFn = CellPropsOptions => ?TextInputProp;

export type Props = $ReadOnly<{|
  // Required props
  onFulfill: (code: string) => void,

  // Not required props (rewritten in defaultProps)
  CellComponent: ComponentType<any>,
  autoFocus: boolean,
  codeLength: number,
  defaultCode: ?string,
  normalizeCode: string => string,

  activeColor: string,
  cellBorderWidth: number,
  inactiveColor: string,
  inputPosition: InputPositions,
  size: number,
  space: number,
  variant: VariantNames,
  keyboardType: KeyboardType,
  maskSymbol: string,

  cellProps: null | TextInputProp | CellPropsFn,
  containerProps: ViewProps,
  inputProps: TextInputProp,
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
