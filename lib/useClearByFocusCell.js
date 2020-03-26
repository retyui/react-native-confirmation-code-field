import { useMemo, useRef } from 'react';
import { Platform } from 'react-native';
const findIndex = ({ locationX, locationY }, map) => {
    for (const [index, { x, y, xEnd, yEnd }] of Object.entries(map)) {
        if (x < locationX &&
            locationX < xEnd &&
            y < locationY &&
            locationY < yEnd) {
            return parseInt(index, 10);
        }
    }
    return -1;
};
const useClearByFocusCell = (options) => {
    const valueRef = useRef(options);
    const cellsLayouts = useRef({});
    valueRef.current = options;
    const clearCodeByCoords = (coords) => {
        const index = findIndex(coords, cellsLayouts.current);
        if (index !== -1) {
            const { value, setValue } = valueRef.current;
            const text = (value || '').slice(0, index);
            setValue(text);
        }
    };
    const getCellOnLayoutHandler = (index) => (event) => {
        const { width, height, x, y } = event.nativeEvent.layout;
        cellsLayouts.current[`${index}`] = {
            x,
            xEnd: x + width,
            y,
            yEnd: y + height,
        };
    };
    const onPress = (event) => clearCodeByCoords(event.nativeEvent);
    // For support react-native-web
    const onClick = (e) => {
        const offset = e.target.getClientRects()[0];
        const locationX = e.clientX - offset.left;
        const locationY = e.clientY - offset.top;
        clearCodeByCoords({ locationX, locationY });
    };
    return [
        useMemo(() => (Platform.OS === 'web' ? { onClick } : { onPress }), 
        // eslint-disable-next-line
        []),
        getCellOnLayoutHandler,
    ];
};
export default useClearByFocusCell;
