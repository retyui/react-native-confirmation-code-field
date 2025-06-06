import {useCallback, useEffect, useRef} from 'react';
import type {LayoutChangeEvent} from 'react-native';

interface Layout {
  x: number;
  y: number;
  xEnd: number;
  yEnd: number;
}

interface LayoutsMap {
  [cellIndex: string]: Layout;
}
interface OnLayoutsMap {
  [index: number]: (event: LayoutChangeEvent) => void;
}

interface Coords {
  locationX: number;
  locationY: number;
}

function findIndex({locationX, locationY}: Coords, map: LayoutsMap): number {
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
}

export interface Params {
  setValue(text: string): void;
  value?: string;
}

export const useClearByFocusCellCommon = (params: Params) => {
  'use memo';

  const paramsRef = useRef<Params>(params);
  const cellsLayouts = useRef<LayoutsMap>({});
  const callbackRef = useRef<OnLayoutsMap>({});

  useEffect(() => {
    paramsRef.current = params;
  }, [params]);

  const clearCodeByCoords = useCallback(function clearCodeByCoords(
    coords: Coords,
  ): void {
    const index = findIndex(coords, cellsLayouts.current);
    if (index !== -1) {
      const {value, setValue} = paramsRef.current;
      const text = (value || '').slice(0, index);
      setValue(text);
    }
  }, []);

  const getCellOnLayoutHandler = useCallback(function getCellOnLayoutHandler(
    index: number,
  ) {
    if (!callbackRef.current[index]) {
      callbackRef.current[index] = function onCellLayout(
        event: LayoutChangeEvent,
      ) {
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
