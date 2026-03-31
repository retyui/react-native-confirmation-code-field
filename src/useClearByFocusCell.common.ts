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

interface Coords {
  locationX: number;
  locationY: number;
}

const findIndex = ({locationX, locationY}: Coords, map: LayoutsMap): number => {
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
  const cellsLayouts = useRef<LayoutsMap>({});
  const callbackRef = useRef<OnLayoutsMap>({});

  useEffect(() => {
    paramsRef.current = params;
  }, [params]);

  const clearCodeByCoords = useCallback((coords: Coords): void => {
    const index = findIndex(coords, cellsLayouts.current);
    if (index !== -1) {
      const {value, setValue} = paramsRef.current;
      const text = (value || '').slice(0, index);
      setValue(text);
    }
  }, []);

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
