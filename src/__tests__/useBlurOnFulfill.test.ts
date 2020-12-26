import {useBlurOnFulfill} from '../useBlurOnFulfill';
import {renderHook} from '@testing-library/react-hooks';

it('should invoke blur method of ref when value length equal cellCount', () => {
  const blur = jest.fn();
  const cellCount = 4;
  let value = '';

  const {result, rerender} = renderHook(() =>
    useBlurOnFulfill({
      cellCount,
      get value() {
        // Sorry but currently no normal API
        // TODO: remove getter when RFC will be accepted https://github.com/testing-library/react-hooks-testing-library/issues/56
        return value;
      },
    }),
  );

  // @ts-expect-error - 'current' is mutable prop
  result.current.current = {blur};

  value = '1234';

  rerender();

  expect(blur).toHaveBeenCalledTimes(1);
});

it('should not throw an error when ref null and value length equal cellCount', () => {
  const cellCount = 4;
  let value = '';

  const {result, rerender} = renderHook(() =>
    useBlurOnFulfill({
      cellCount,
      get value() {
        // Sorry but currently no normal API
        // TODO: remove getter when RFC will be accepted https://github.com/testing-library/react-hooks-testing-library/issues/56
        return value;
      },
    }),
  );

  // @ts-expect-error - 'current' is mutable prop
  result.current.current = null;

  value = '1234';

  expect(() => {
    rerender();
  }).not.toThrow();
});
