import type {FC, PropsWithChildren, ReactNode} from 'react';
import {useCallback, useEffect, useState} from 'react';

import {useTimeout} from './useTimer';

export const DEFAULT_BLINKING_SPEED = 500;

interface MaskSymbolProps {
  delay?: number;
  maskSymbol: ReactNode;
  isLastFilledCell: boolean;
}

export const MaskSymbol: FC<PropsWithChildren<MaskSymbolProps>> = ({
  isLastFilledCell,
  children: symbol,
  maskSymbol,
  delay = DEFAULT_BLINKING_SPEED,
}) => {
  'use memo';
  const [visibleFlag, setFlag] = useState(true);

  const toggleVisibility = useCallback(() => {
    setFlag((prev) => !prev);
  }, []);

  useTimeout(toggleVisibility, delay);

  useEffect(() => {
    if (isLastFilledCell) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFlag(false);
    }
  }, [isLastFilledCell]);

  return <>{visibleFlag ? symbol : maskSymbol}</>;
};

MaskSymbol.displayName = 'MaskSymbol';
