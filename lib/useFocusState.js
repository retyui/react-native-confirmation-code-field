import { useState } from 'react';
import useEvent from './useEvent';
const useFocusState = ({ onBlur, onFocus, }) => {
    const [isFocused, setFocusFlag] = useState(false);
    return [
        isFocused,
        useEvent(onBlur, () => setFocusFlag(false)),
        useEvent(onFocus, () => setFocusFlag(true)),
    ];
};
export default useFocusState;
