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
      onClick: (event): void => {
        // @ts-expect-error - getClientRects have to be defined on the target
        const [offset] = event.target.getClientRects() as [
          {left: number; top: number},
        ];
        clearCodeByCoords(
          event.clientX - offset.left,
          event.clientY - offset.top,
        );
      },
    }),
    [clearCodeByCoords],
  );

  return [inputProps, getCellOnLayoutHandler] as const;
};
