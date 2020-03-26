import React from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
  TextInputProps,
} from 'react-native';

export interface ITextInputCustomProps extends TextInputProps {
  ref: any;
}

const TextInputCustom = (
  props: ITextInputCustomProps,
): typeof TextInput | any => {
  const {onKeyPress, editable} = props;
  // This hack needs to get click position and then calculate what cell on clicked
  const _onKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (onKeyPress && (editable || editable === undefined)) {
      onKeyPress(event);
    }
    return <TextInput onKeyPress={_onKeyPress} editable={editable} />;
  };
};

export default TextInputCustom;
