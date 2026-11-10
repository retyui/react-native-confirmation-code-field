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
      onPressOut: (event: NativeSyntheticEvent<NativeTouchEvent>): void => {
        const {locationX, locationY} = event.nativeEvent;
        clearCodeByCoords(locationX, locationY);
      },
    }),
    [clearCodeByCoords],
  );

  return [inputProps, getCellOnLayoutHandler] as const;
};
