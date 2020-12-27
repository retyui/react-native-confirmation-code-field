import {Platform} from 'react-native';
import {useClearByFocusCell} from '../useClearByFocusCell';
import {renderHook} from '@testing-library/react-hooks';

interface Params {
  getCellOnLayoutHandler(index: number): (event: any) => void;
  count: number;
  size: number;
}

interface Options {
  size: number;
  index: number;
}

const callPosition = ({size, index}: Options) => ({
  locationX: size * index + size / 2,
  locationY: size / 2,
});

const initLayouts = ({getCellOnLayoutHandler, count, size}: Params) => {
  new Array(count).fill(0).map((_, index) => {
    const offsetX = size * index;

    getCellOnLayoutHandler(index)({
      nativeEvent: {layout: {width: size, height: size, x: offsetX, y: 0}},
    });
  });
};

it('should clear value coords', () => {
  const setValue = jest.fn();
  const value = '123456';
  const size = 100;
  const count = 6;

  const {result} = renderHook(() =>
    useClearByFocusCell({
      setValue,
      value,
    }),
  );

  const [props, getCellOnLayoutHandler] = result.current;

  initLayouts({size, count, getCellOnLayoutHandler});

  /*
   * [1] [2] [3] [4] [5] [6]
   * --------^^^ press location `index:2`
   */
  props.onPressOut({
    // @ts-expect-error - mock of nativeEvent
    nativeEvent: callPosition({size, index: 2}),
  });

  expect(setValue).toHaveBeenCalledWith('12');
});

it('should do nothing when press outside of cell', () => {
  const setValue = jest.fn();
  const value = '123456';
  const size = 100;
  const count = 6;

  const {result} = renderHook(() =>
    useClearByFocusCell({
      setValue,
      value,
    }),
  );

  const [props, getCellOnLayoutHandler] = result.current;

  initLayouts({size, count, getCellOnLayoutHandler});

  /*
   * [1] [2] [3] [4] [5] [6]
   * -------------------------^^ press location `index:6`
   */
  props.onPressOut({
    // @ts-expect-error - mock of nativeEvent
    nativeEvent: callPosition({size, index: 6}),
  });

  expect(setValue).toHaveBeenCalledTimes(0);
});

it('should invoke setValue with empty string when value undefined and user press inside first cell', () => {
  const setValue = jest.fn();
  const value = undefined;
  const size = 100;
  const count = 6;

  const {result} = renderHook(() =>
    useClearByFocusCell({
      setValue,
      value,
    }),
  );

  const [props, getCellOnLayoutHandler] = result.current;

  initLayouts({size, count, getCellOnLayoutHandler});

  /*
   *     [ ] [ ] [ ] [ ] [ ] [ ]
   * ----^^ press location `index:0`
   */
  props.onPressOut({
    // @ts-expect-error - mock of nativeEvent
    nativeEvent: callPosition({size, index: 0}),
  });

  expect(setValue).toHaveBeenCalledWith('');
});

it('should adapt a Web click event to ReactNative press event', () => {
  // @ts-expect-error - web support
  Platform.select = ({web}) => web;

  const setValue = jest.fn();
  const value = '123456';
  const size = 100;
  const count = 6;

  const {result} = renderHook(() =>
    useClearByFocusCell({
      setValue,
      value,
    }),
  );

  const [props, getCellOnLayoutHandler] = result.current;

  initLayouts({size, count, getCellOnLayoutHandler});

  const {locationX: clientX, locationY: clientY} = callPosition({
    index: 3,
    size,
  });

  /*
   *  [1] [2] [3] [4] [5] [6]
   *  ------------^^ press location `index:3`
   */
  // @ts-expect-error - web support
  props.onClick({
    target: {getClientRects: () => [{left: 0, top: 0}]},
    clientX,
    clientY,
  });

  expect(setValue).toHaveBeenCalledWith('123');
});
