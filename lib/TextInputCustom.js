import React from 'react';
import { TextInput, TouchableOpacity, } from 'react-native';
const TextInputCustom = (props) => {
    const { onPress, editable } = props;
    // This hack needs to get click position and then calculate what cell on clicked
    const _onPress = (event) => {
        if (onPress && (editable || editable === undefined)) {
            onPress(event);
        }
    };
    return (<TouchableOpacity onPress={_onPress}>
      <TextInput {...props} editable={editable} pointerEvents="none" onTouchStart-={_onPress}/>
      ;
    </TouchableOpacity>);
};
export default TextInputCustom;
