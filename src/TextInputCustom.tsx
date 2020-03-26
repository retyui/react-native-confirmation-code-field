import React, {ReactElement} from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
  TextInputProps,
} from 'react-native';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface ITextInputCustomProps extends TextInputProps {
  ref: any;
}

const TextInputCustom = (props: ITextInputCustomProps): ReactElement => {
  const {onKeyPress, editable} = props;
  // This hack needs to get click position and then calculate what cell on clicked
  const _onKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (onKeyPress && (editable || editable === undefined)) {
      onKeyPress(event);
    }
  };
  return <TextInput onKeyPress={_onKeyPress} editable={editable} />;
};

export default TextInputCustom;
