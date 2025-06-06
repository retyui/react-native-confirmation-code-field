import {useMemo} from 'react';
import type {NativeSyntheticEvent, NativeTouchEvent} from 'react-native';

import type {Params} from './useClearByFocusCell.common';
import {useClearByFocusCellCommon} from './useClearByFocusCell.common';

export const useClearByFocusCell = (params: Params) => {
  'use memo';

  const [clearCodeByCoords, getCellOnLayoutHandler] =
    useClearByFocusCellCommon(params);

  const inputProps = useMemo(
    () => ({
      onPressOut: function onInputPressOut(
        event: NativeSyntheticEvent<NativeTouchEvent>,
      ): void {
        clearCodeByCoords(event.nativeEvent);
      },
    }),
    [clearCodeByCoords],
  );

  return [inputProps, getCellOnLayoutHandler] as const;
};
