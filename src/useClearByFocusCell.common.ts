import {useCallback, useEffect, useRef} from 'react';
import type {LayoutChangeEvent} from 'react-native';

interface Layout {
  x: number;
  y: number;
  xEnd: number;
  yEnd: number;
}

type LayoutsMap = Record<string, Layout>;
type OnLayoutsMap = Record<number, (event: LayoutChangeEvent) => void>;

const findIndex = (
  locationX: number,
  locationY: number,
  map: LayoutsMap,
): number => {
  for (const index in map) {
    const layout = map[index];
    if (
      layout.x < locationX &&
      locationX < layout.xEnd &&
      layout.y < locationY &&
      locationY < layout.yEnd
    ) {
      return parseInt(index, 10);
    }
  }
  return -1;
};

export interface Params {
  setValue(text: string): void;
  value?: string;
}

export const useClearByFocusCellCommon = (params: Params) => {
  'use memo';

  const paramsRef = useRef<Params>(params);
  // Layouts are never removed: if `cellCount` decreases, removed cells keep their old
  // positions here, so a press at that spot can still trim the value
  const cellsLayouts = useRef<LayoutsMap>({});
  const callbackRef = useRef<OnLayoutsMap>({});

  useEffect(() => {
    paramsRef.current = params;
  }, [params]);

  const clearCodeByCoords = useCallback(
    (locationX: number, locationY: number): void => {
      const index = findIndex(locationX, locationY, cellsLayouts.current);
      if (index !== -1) {
        const {value, setValue} = paramsRef.current;
        const text = (value || '').slice(0, index);
        setValue(text);
      }
    },
    [],
  );

  const getCellOnLayoutHandler = useCallback((index: number) => {
    if (!callbackRef.current[index]) {
      callbackRef.current[index] = (event: LayoutChangeEvent): void => {
        const {width, height, x, y} = event.nativeEvent.layout;
        cellsLayouts.current[`${index}`] = {
          x,
          xEnd: x + width,
          y,
          yEnd: y + height,
        };
      };
    }
    return callbackRef.current[index];
  }, []);

  return [clearCodeByCoords, getCellOnLayoutHandler] as const;
};
