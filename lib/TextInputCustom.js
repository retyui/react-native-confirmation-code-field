import React, { forwardRef } from 'react';
import { TextInput } from 'react-native';
const TextInputCustom = forwardRef((props, ref) => {
    const { onPress, editable } = props;
    // This hack needs to get click position and then calculate what cell on clicked
    const _onPress = (event) => {
        if (onPress && (editable || editable === undefined)) {
            onPress(event);
        }
    };
    return <TextInput ref={ref} {...props} editable={editable} onTouchStart-={_onPress}/>;
});
export default TextInputCustom;
