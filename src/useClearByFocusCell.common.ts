import {useCallback, useRef} from 'react';
import type {LayoutChangeEvent} from 'react-native';

interface Layout {
  x: number;
  y: number;
  xEnd: number;
  yEnd: number;
}

type OnLayout = (event: LayoutChangeEvent) => void;

export interface Coords {
  locationX: number;
  locationY: number;
}

// Finds the cell under the press. A press in a gap between cells goes to the nearest cell;
// a press outside the area covered by the cells returns -1.
const findIndex = (
  {locationX, locationY}: Coords,
  layouts: (Layout | undefined)[],
  cellCount: number,
): number => {
  let bounds: Layout | null = null;
  let nearestIndex = -1;
  let nearestDistance = Infinity;

  for (let index = 0; index < cellCount; index++) {
    const layout = layouts[index];
    if (!layout) {
      continue;
    }

    bounds = bounds
      ? {
          x: Math.min(bounds.x, layout.x),
          y: Math.min(bounds.y, layout.y),
          xEnd: Math.max(bounds.xEnd, layout.xEnd),
          yEnd: Math.max(bounds.yEnd, layout.yEnd),
        }
      : layout;

    const dx = Math.max(layout.x - locationX, 0, locationX - layout.xEnd);
    const dy = Math.max(layout.y - locationY, 0, locationY - layout.yEnd);
    const distance = dx * dx + dy * dy;
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = index;
    }
  }

  const isInside =
    bounds !== null &&
    bounds.x <= locationX &&
    locationX <= bounds.xEnd &&
    bounds.y <= locationY &&
    locationY <= bounds.yEnd;

  return isInside ? nearestIndex : -1;
};

export interface Params {
  setValue(text: string): void;
  value?: string;
  cellCount: number;
}

export const useClearByFocusCellCommon = ({
  value,
  setValue,
  cellCount,
}: Params) => {
  'use memo';

  const cellsLayouts = useRef<(Layout | undefined)[]>([]);
  const onLayoutHandlers = useRef<OnLayout[]>([]);

  const clearCodeByCoords = useCallback(
    (coords: Coords): void => {
      const index = findIndex(coords, cellsLayouts.current, cellCount);
      if (index !== -1) {
        setValue((value || '').slice(0, index));
      }
    },
    [value, setValue, cellCount],
  );

  // Handlers are cached per index so cells don't get a new `onLayout` on every render
  const getCellOnLayoutHandler = useCallback((index: number): OnLayout => {
    if (!onLayoutHandlers.current[index]) {
      onLayoutHandlers.current[index] = (event: LayoutChangeEvent): void => {
        const {width, height, x, y} = event.nativeEvent.layout;
        cellsLayouts.current[index] = {
          x,
          xEnd: x + width,
          y,
          yEnd: y + height,
        };
      };
    }
    return onLayoutHandlers.current[index];
  }, []);

  return {clearCodeByCoords, getCellOnLayoutHandler};
};
