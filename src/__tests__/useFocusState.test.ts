import {renderHook, act} from '@testing-library/react-hooks';
import {useFocusState} from '../useFocusState';

it('should invoke passed handler', () => {
  const onBlur = jest.fn();
  const onFocus = jest.fn();
  const focusEvent = {test: 'event focus'};
  const blurEvent = {test: 'event blur'};

  const {result} = renderHook(() => useFocusState(onBlur, onFocus));

  act(() => {
    result.current.onFocus(
      // @ts-expect-error 'focusEvent' mock event
      focusEvent,
    );
    result.current.onBlur(
      // @ts-expect-error 'blurEvent' mock event
      blurEvent,
    );
  });

  expect(onBlur).toHaveBeenCalledWith(blurEvent);
  expect(onFocus).toHaveBeenCalledWith(focusEvent);
});

it('should not throw an error when pass empty handler', () => {
  const onBlur = undefined;
  const onFocus = undefined;
  const {result} = renderHook(() => useFocusState(onBlur, onFocus));

  act(() => {
    // @ts-expect-error invoke without event
    result.current.onFocus();
    // @ts-expect-error invoke without event
    result.current.onBlur();
  });
});

it('should memoize handlers', () => {
  const onBlur = jest.fn();
  const onFocus = jest.fn();
  const {result, rerender} = renderHook(() => useFocusState(onBlur, onFocus));

  const {onBlur: initialOnBlur, onFocus: initialOnFocus} = result.current;

  act(() => {
    rerender({new: 'props'});
  });

  expect(result.current.onBlur).toBe(initialOnBlur);
  expect(result.current.onFocus).toBe(initialOnFocus);
});

it('should enable isFocused on focus ', () => {
  const onBlur = undefined;
  const onFocus = undefined;
  const {result} = renderHook(() => useFocusState(onBlur, onFocus));

  expect(result.current.isFocused).toBe(false);

  act(() => {
    // @ts-expect-error invoke without event
    result.current.onFocus();
  });

  expect(result.current.isFocused).toBe(true);
});

it('should disable isFocused on blur', () => {
  const onBlur = undefined;
  const onFocus = undefined;
  const {result} = renderHook(() => useFocusState(onBlur, onFocus));

  act(() => {
    // @ts-expect-error invoke without event
    result.current.onFocus();
  });

  expect(result.current.isFocused).toBe(true);

  act(() => {
    // @ts-expect-error invoke without event
    result.current.onBlur();
  });

  expect(result.current.isFocused).toBe(false);
});
