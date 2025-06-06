import type {ReactNode} from 'react';
import React, {useCallback, useEffect, useState} from 'react';

import {useTimeout} from './useTimer';

export const DEFAULT_BLINKING_SPEED = 500;

interface MaskSymbolProps {
  delay?: number;
  children: ReactNode;
  maskSymbol: ReactNode;
  isLastFilledCell: boolean;
}

export function MaskSymbol({
  isLastFilledCell,
  children: symbol,
  maskSymbol,
  delay = DEFAULT_BLINKING_SPEED,
}: MaskSymbolProps) {
  'use memo';
  const [visibleFlag, setFlag] = useState(true);

  const toggleVisibility = useCallback(function toggleMaskVisibility() {
    setFlag((prev) => !prev);
  }, []);

  useTimeout(toggleVisibility, delay);

  useEffect(() => {
    if (isLastFilledCell) {
      setFlag(false);
    }
  }, [isLastFilledCell]);

  return <>{visibleFlag ? symbol : maskSymbol}</>;
}

MaskSymbol.displayName = 'MaskSymbol';
