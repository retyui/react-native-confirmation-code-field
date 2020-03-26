import { useEffect, useState } from 'react';
import { useInterval } from './useTimer';
export const DEFAULT_BLINKING_SPEED = 500;
export const DEFAULT_CURSOR_SYMBOL = '|';
const Cursor = ({ cursorSymbol = DEFAULT_CURSOR_SYMBOL, delay = DEFAULT_BLINKING_SPEED, }) => {
    const [visibleFlag, setFlag] = useState(true);
    const [start, stop] = useInterval(() => setFlag((flag) => !flag), delay, []);
    useEffect(() => {
        start();
        return stop;
    }, [start, stop]);
    // @ts-ignore
    return visibleFlag ? cursorSymbol : '';
};
export default Cursor;
