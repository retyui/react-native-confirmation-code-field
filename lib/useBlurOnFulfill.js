import { useRef } from 'react';
const useBlurOnFulfill = ({ value, cellCount }) => {
    const inputRef = useRef(null);
    if (value && value.length === cellCount) {
        const { current: inputInstance } = inputRef;
        if (inputInstance) {
            inputInstance.blur();
        }
    }
    return inputRef;
};
export default useBlurOnFulfill;
