import React, {useState, useCallback} from 'react';

import {useInterval} from './useTimer';

export const DEFAULT_BLINKING_SPEED = 500;
export const DEFAULT_CURSOR_SYMBOL = '|';

export interface CursorProps {
  cursorSymbol?: string;
  delay?: number;
}

export function Cursor({
  cursorSymbol = DEFAULT_CURSOR_SYMBOL,
  delay = DEFAULT_BLINKING_SPEED,
}: CursorProps) {
  'use memo';
  const [visibleFlag, setFlag] = useState(true);

  const toggleVisibility = useCallback(function toggleCursorVisibility() {
    setFlag((prev) => !prev);
  }, []);

  useInterval(toggleVisibility, delay);

  return <>{visibleFlag ? cursorSymbol : ''}</>;
}

Cursor.displayName = 'Cursor';
