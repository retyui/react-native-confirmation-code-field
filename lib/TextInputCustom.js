import React from 'react';
import { TextInput, } from 'react-native';
const TextInputCustom = (props) => {
    const { onKeyPress, editable } = props;
    // This hack needs to get click position and then calculate what cell on clicked
    const _onKeyPress = (event) => {
        if (onKeyPress && (editable || editable === undefined)) {
            onKeyPress(event);
        }
    };
    return <TextInput onKeyPress={_onKeyPress} editable={editable}/>;
};
export default TextInputCustom;
