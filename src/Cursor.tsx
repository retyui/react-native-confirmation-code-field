import {useEffect, useState} from 'react';
import useTimer from './useTimer';

export const DEFAULT_BLINKING_SPEED = 500;
export const DEFAULT_CURSOR_SYMBOL = '|';

const Cursor = ({
  cursorSymbol = DEFAULT_CURSOR_SYMBOL,
  delay = DEFAULT_BLINKING_SPEED,
}): JSX.Element => {
  const [visibleFlag, setFlag] = useState(true);
  const [start, stop] = useTimer(() => setFlag(flag => !flag), delay, []);

  useEffect(() => {
    start();

    return stop;
  }, [start, stop]);

  // @ts-ignore
  return visibleFlag ? cursorSymbol : '';
};

export default Cursor;
