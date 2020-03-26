import { useEffect, useState } from 'react';
import { useTimeout } from './useTimer';
export const DEFAULT_BLINKING_SPEED = 500;
const MaskSymbol = ({ isLastFilledCell, children: symbol, maskSymbol, delay = DEFAULT_BLINKING_SPEED, }) => {
    const [visibleFlag, setFlag] = useState(true);
    const [start, stop] = useTimeout(() => setFlag(false), delay, []);
    useEffect(() => {
        if (isLastFilledCell) {
            setFlag(false);
        }
    }, [isLastFilledCell]);
    useEffect(() => {
        start();
        return stop;
    }, [start, stop]);
    // @ts-ignore
    return visibleFlag ? symbol : maskSymbol;
};
export default MaskSymbol;
