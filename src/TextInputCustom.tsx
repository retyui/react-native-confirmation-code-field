import React, {ReactElement} from 'react';
import {
  GestureResponderEvent,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface ITextInputCustomProps extends TextInputProps {
  ref: any;
  onPress?: (event: GestureResponderEvent) => void;
}

const TextInputCustom = (props: ITextInputCustomProps): ReactElement => {
  const {onPress, editable} = props;
  // This hack needs to get click position and then calculate what cell on clicked
  const _onPress = (event: GestureResponderEvent) => {
    if (onPress && (editable || editable === undefined)) {
      onPress(event);
    }
  };
  return (
    <TouchableOpacity onPress={_onPress}>
      <TextInput
        {...props}
        editable={editable}
        pointerEvents="none"
        onTouchStart-={_onPress}
      />
      ;
    </TouchableOpacity>
  );
};

export default TextInputCustom;
