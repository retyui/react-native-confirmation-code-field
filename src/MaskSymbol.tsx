import {useEffect, useState} from 'react';
import {useTimeout} from './useTimer';

export const DEFAULT_BLINKING_SPEED = 500;

interface Props {
  maskSymbol: string;
  isLastFilledCell: boolean;
  children: string;
  delay?: number;
}

export function MaskSymbol({
  isLastFilledCell,
  children: symbol,
  maskSymbol,
  delay = DEFAULT_BLINKING_SPEED,
}: Props): React.ReactNode {
  const [visibleFlag, setFlag] = useState(true);

  useTimeout(() => setFlag(false), delay);

  useEffect(() => {
    if (isLastFilledCell) {
      setFlag(false);
    }
  }, [isLastFilledCell]);

  return visibleFlag ? symbol : maskSymbol;
}
