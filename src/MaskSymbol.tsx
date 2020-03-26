import { useEffect, useState } from 'react';
import { useTimeout } from './useTimer';

export const DEFAULT_BLINKING_SPEED = 500;

type Props = {
  maskSymbol: string;
  isLastFilledCell: boolean;
  children: string;
  delay?: number;
};

const MaskSymbol = ({ isLastFilledCell, children: symbol, maskSymbol, delay = DEFAULT_BLINKING_SPEED }: Props): JSX.Element => {
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
