import { useCallback } from 'react';
const useEvent = (nativeEvent, customHandler) => {
    const handleOnEvent = useCallback((event) => {
        customHandler();
        if (nativeEvent) {
            nativeEvent(event);
        }
    }, [nativeEvent]);
    return handleOnEvent;
};
export default useEvent;
