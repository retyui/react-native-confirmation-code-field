import type {FC} from 'react';
import {useCallback, useState} from 'react';

import {useInterval} from './useTimer';

export const DEFAULT_BLINKING_SPEED = 500;
export const DEFAULT_CURSOR_SYMBOL = '|';

export interface CursorProps {
  cursorSymbol?: string;
  delay?: number;
}

export const Cursor: FC<CursorProps> = ({
  cursorSymbol = DEFAULT_CURSOR_SYMBOL,
  delay = DEFAULT_BLINKING_SPEED,
}) => {
  'use memo';
  const [visibleFlag, setFlag] = useState(true);

  const toggleVisibility = useCallback(() => {
    setFlag((prev) => !prev);
  }, []);

  useInterval(toggleVisibility, delay);

  return <>{visibleFlag ? cursorSymbol : ''}</>;
};

Cursor.displayName = 'Cursor';
