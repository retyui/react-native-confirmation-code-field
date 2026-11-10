import {renderHook} from '@testing-library/react-native';

import {useClearByFocusCell} from '../useClearByFocusCell';
import {useClearByFocusCell as useClearByFocusCellWeb} from '../useClearByFocusCell.web';

const SIZE = 100;
const GAP = 20;

// Lays out `count` square cells in a row with a gap between them
const initLayouts = (
  getCellOnLayoutHandler: (index: number) => (event: any) => void,
  count: number,
) => {
  for (let index = 0; index < count; index++) {
    getCellOnLayoutHandler(index)({
      nativeEvent: {
        layout: {width: SIZE, height: SIZE, x: (SIZE + GAP) * index, y: 0},
      },
    });
  }
};

// Center of the cell at `index`
const cellCenter = (index: number) => ({
  locationX: (SIZE + GAP) * index + SIZE / 2,
  locationY: SIZE / 2,
});

const press = (
  inputProps: ReturnType<typeof useClearByFocusCell>['inputProps'],
  coords: {locationX: number; locationY: number},
) =>
  // @ts-expect-error - mock of nativeEvent
  inputProps.onPressOut({nativeEvent: coords});

const setup = (value: string | undefined, cellCount = 6) => {
  const setValue = jest.fn();
  const {result} = renderHook(() =>
    useClearByFocusCell({setValue, value, cellCount}),
  );
  initLayouts(result.current.getCellOnLayoutHandler, cellCount);
  return {setValue, result};
};

it('should clear value from the pressed cell', () => {
  const {setValue, result} = setup('123456');

  /*
   * [1] [2] [3] [4] [5] [6]
   * --------^^^ press location `index:2`
   */
  press(result.current.inputProps, cellCenter(2));

  expect(setValue).toHaveBeenCalledWith('12');
});

it('should use the nearest cell when pressing in a gap between cells', () => {
  const {setValue, result} = setup('123456');

  /*
   * [1] [2] [3] [4] [5] [6]
   * ---------^ press in the gap, closer to `index:2`
   */
  press(result.current.inputProps, {
    locationX: (SIZE + GAP) * 2 - 2,
    locationY: SIZE / 2,
  });

  expect(setValue).toHaveBeenCalledWith('12');
});

it('should do nothing when press outside of cells', () => {
  const {setValue, result} = setup('123456');

  /*
   * [1] [2] [3] [4] [5] [6]
   * -------------------------^^ press location `index:6`
   */
  press(result.current.inputProps, cellCenter(6));
  press(result.current.inputProps, {locationX: SIZE / 2, locationY: SIZE * 2});

  expect(setValue).toHaveBeenCalledTimes(0);
});

it('should ignore layouts of cells beyond cellCount', () => {
  const setValue = jest.fn();
  let cellCount = 6;
  const {result, rerender} = renderHook(() =>
    useClearByFocusCell({setValue, value: '1234', cellCount}),
  );
  initLayouts(result.current.getCellOnLayoutHandler, cellCount);

  cellCount = 4;
  rerender({});

  press(result.current.inputProps, cellCenter(5));

  expect(setValue).toHaveBeenCalledTimes(0);
});

it('should keep onLayout handlers stable between renders', () => {
  const {result, rerender} = renderHook(() =>
    useClearByFocusCell({setValue: jest.fn(), value: '', cellCount: 4}),
  );
  const handler = result.current.getCellOnLayoutHandler(1);

  rerender({});

  expect(result.current.getCellOnLayoutHandler(1)).toBe(handler);
});

it('should invoke setValue with empty string when value undefined and user press inside first cell', () => {
  const {setValue, result} = setup(undefined);

  press(result.current.inputProps, cellCenter(0));

  expect(setValue).toHaveBeenCalledWith('');
});

it('should adapt a Web click event to ReactNative press event', () => {
  const setValue = jest.fn();
  const left = 10;
  const top = 30;

  const {result} = renderHook(() =>
    useClearByFocusCellWeb({setValue, value: '123456', cellCount: 6}),
  );

  initLayouts(result.current.getCellOnLayoutHandler, 6);

  const {locationX, locationY} = cellCenter(3);

  /*
   *  [1] [2] [3] [4] [5] [6]
   *  ------------^^ press location `index:3`
   */
  result.current.inputProps.onClick({
    currentTarget: {getBoundingClientRect: () => ({left, top})},
    clientX: locationX + left,
    clientY: locationY + top,
  });

  expect(setValue).toHaveBeenCalledWith('123');
});
