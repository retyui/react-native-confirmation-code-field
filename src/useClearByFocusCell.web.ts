import type {ComponentProps} from 'react';
import {useMemo} from 'react';

import type {Params} from './useClearByFocusCell.common';
import {useClearByFocusCellCommon} from './useClearByFocusCell.common';

export const useClearByFocusCell = (params: Params) => {
  'use memo';

  const [clearCodeByCoords, getCellOnLayoutHandler] =
    useClearByFocusCellCommon(params);

  const inputProps = useMemo(
    (): {
      onClick: ComponentProps<'input'>['onClick'];
    } => ({
      onClick: function onInputClick(event): void {
        // @ts-expect-error - getClientRects have to be defined on the target
        const [offset] = event.target.getClientRects() as [
          {left: number; top: number},
        ];
        const locationX = event.clientX - offset.left;
        const locationY = event.clientY - offset.top;

        clearCodeByCoords({locationX, locationY});
      },
    }),
    [clearCodeByCoords],
  );

  return [inputProps, getCellOnLayoutHandler] as const;
};
