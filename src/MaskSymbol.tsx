import type {FC, PropsWithChildren, ReactNode} from 'react';
import {useCallback, useState} from 'react';

import {useTimeout} from './useTimer';
import {DEFAULT_BLINKING_SPEED} from './utils';

export interface MaskSymbolProps {
  /** How long the symbol stays visible before it's masked (ms) */
  delay?: number;
  maskSymbol: ReactNode;
  /** Mask right away, without waiting for `delay`. Pass `isPrevFilled` from `renderCell` */
  masked?: boolean;
}

export const MaskSymbol: FC<PropsWithChildren<MaskSymbolProps>> = ({
  masked = false,
  children: symbol,
  maskSymbol,
  delay = DEFAULT_BLINKING_SPEED,
}) => {
  'use memo';
  const [timedOut, setTimedOut] = useState(false);

  const onTimeout = useCallback(() => {
    setTimedOut(true);
  }, []);

  useTimeout(onTimeout, delay);

  return <>{timedOut || masked ? maskSymbol : symbol}</>;
};

MaskSymbol.displayName = 'MaskSymbol';
