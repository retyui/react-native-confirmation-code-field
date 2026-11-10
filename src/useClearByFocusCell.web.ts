import {useMemo} from 'react';

import type {Params} from './useClearByFocusCell.common';
import {useClearByFocusCellCommon} from './useClearByFocusCell.common';

// Subset of the DOM `MouseEvent` this hook reads (the project doesn't build against the DOM lib)
interface ClickEvent {
  clientX: number;
  clientY: number;
  currentTarget: {getBoundingClientRect(): {left: number; top: number}};
}

export const useClearByFocusCell = (params: Params) => {
  'use memo';

  const {clearCodeByCoords, getCellOnLayoutHandler} =
    useClearByFocusCellCommon(params);

  const inputProps = useMemo(
    () => ({
      onClick: (event: ClickEvent): void => {
        const {left, top} = event.currentTarget.getBoundingClientRect();

        clearCodeByCoords({
          locationX: event.clientX - left,
          locationY: event.clientY - top,
        });
      },
    }),
    [clearCodeByCoords],
  );

  return {inputProps, getCellOnLayoutHandler};
};
