import {useEffect, useState} from 'react';

const MaskSymbol = ({isLastIndex, value, mask = '﹡', delay = 500}) => {
  const [isShowValue, setFlag] = useState(true);

  useEffect(() => {
    const id = setTimeout(setFlag, delay, false);

    return () => clearTimeout(id);
  }, [delay]);

  if (!isLastIndex) {
    return mask;
  }

  return isShowValue ? value : mask;
};

export default MaskSymbol;
