import type {FC} from 'react';
import {useReducer} from 'react';

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
  const [visibleFlag, toggle] = useReducer((prev: boolean) => !prev, true);

  useInterval(toggle, delay);

  return visibleFlag ? cursorSymbol : '';
};

Cursor.displayName = 'Cursor';
