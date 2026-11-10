import {useCallback, useEffect, useRef} from 'react';
import type {LayoutChangeEvent} from 'react-native';

type Layout = [x: number, xEnd: number, y: number, yEnd: number];

const findIndex = (x: number, y: number, list: Layout[]): number =>
  list.findIndex((l) => l && l[0] < x && x < l[1] && l[2] < y && y < l[3]);

export interface Params {
  setValue(text: string): void;
  value?: string;
}

export const useClearByFocusCellCommon = (params: Params) => {
  'use memo';

  const paramsRef = useRef<Params>(params);
  // Layouts are never removed: if `cellCount` decreases, removed cells keep their old
  // positions here, so a press at that spot can still trim the value
  const cellsLayouts = useRef<Layout[]>([]);
  const callbackRef = useRef<((event: LayoutChangeEvent) => void)[]>([]);

  useEffect(() => {
    paramsRef.current = params;
  }, [params]);

  const clearCodeByCoords = useCallback((x: number, y: number): void => {
    const index = findIndex(x, y, cellsLayouts.current);
    if (index !== -1) {
      paramsRef.current.setValue(
        (paramsRef.current.value || '').slice(0, index),
      );
    }
  }, []);

  const getCellOnLayoutHandler = useCallback(
    (index: number) =>
      (callbackRef.current[index] ??= ({
        nativeEvent: {
          layout: {x, y, width, height},
        },
      }) => {
        cellsLayouts.current[index] = [x, x + width, y, y + height];
      }),
    [],
  );

  return [clearCodeByCoords, getCellOnLayoutHandler] as const;
};
