import React, { forwardRef, ReactElement } from 'react';
import { GestureResponderEvent, Text, TextInput, TextInputProps, TouchableOpacity } from 'react-native';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface ITextInputCustomProps extends TextInputProps {
  ref: any;
  onPress?: (event: GestureResponderEvent) => void;
}

const TextInputCustom: React.ForwardRefExoticComponent<React.PropsWithoutRef<ITextInputCustomProps> & React.RefAttributes<unknown>> = forwardRef(
  (props: ITextInputCustomProps, ref): ReactElement => {
    const { onPress, editable } = props;
    // This hack needs to get click position and then calculate what cell on clicked
    const _onPress = (event: GestureResponderEvent) => {
      if (onPress && (editable || editable === undefined)) {
        onPress(event);
      }
    };
    return <TextInput ref={ref} {...props} editable={editable} onTouchStart-={_onPress} />;
  }
);

export default TextInputCustom;
