import {useMemo, useRef} from 'react';
import {GestureResponderEvent, LayoutChangeEvent, Platform} from 'react-native';

type LayoutsMap = Record<
  string,
  {x: number; y: number; xEnd: number; yEnd: number}
>;

type Coords = {
  locationX: number;
  locationY: number;
};

const findIndex = ({locationX, locationY}: Coords, map: LayoutsMap): number => {
  for (const [index, {x, y, xEnd, yEnd}] of Object.entries(map)) {
    if (
      x < locationX &&
      locationX < xEnd &&
      y < locationY &&
      locationY < yEnd
    ) {
      return parseInt(index, 10);
    }
  }

  return -1;
};

type Options = {
  setValue: (text: string) => void;
  value?: string;
};

const useClearByFocusCell = (
  options: Options,
): [{}, (index: number) => (event: LayoutChangeEvent) => void] => {
  const valueRef = useRef<Options>(options);
  const cellsLayouts = useRef<LayoutsMap>({});

  valueRef.current = options;

  const clearCodeByCoords = (coords: Coords) => {
    const index = findIndex(coords, cellsLayouts.current);

    if (index !== -1) {
      const {value, setValue} = valueRef.current;
      const text = (value || '').slice(0, index);

      setValue(text);
    }
  };

  const getCellOnLayoutHandler = (index: number) => (
    event: LayoutChangeEvent,
  ) => {
    const {width, height, x, y} = event.nativeEvent.layout;

    cellsLayouts.current[`${index}`] = {
      x,
      xEnd: x + width,
      y,
      yEnd: y + height,
    };
  };

  const onPress = (event: GestureResponderEvent) =>
    clearCodeByCoords(event.nativeEvent);

  // For support react-native-web
  const onClick = (e: any) => {
    const offset = e.target.getClientRects()[0];
    const locationX = e.clientX - offset.left;
    const locationY = e.clientY - offset.top;

    clearCodeByCoords({locationX, locationY});
  };

  return [
    useMemo(
      () => (Platform.OS === 'web' ? {onClick} : {onPress}),
      // eslint-disable-next-line
      [],
    ),
    getCellOnLayoutHandler,
  ];
};

export default useClearByFocusCell;
