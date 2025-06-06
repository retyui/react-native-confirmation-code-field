import type {NativeSyntheticEvent, TextInputFocusEventData} from 'react-native';

import {renderHook, act} from '@testing-library/react-hooks';
import {useFocusState} from '../useFocusState';

const focusEvent = {
  type: 'focus',
} as NativeSyntheticEvent<TextInputFocusEventData>;
const blurEvent = {
  type: 'blur',
} as NativeSyntheticEvent<TextInputFocusEventData>;

it('should invoke passed handler', () => {
  const onBlur = jest.fn();
  const onFocus = jest.fn();

  const {result} = renderHook(() => useFocusState(onBlur, onFocus));

  act(() => {
    result.current[1](focusEvent);
    result.current[2](blurEvent);
  });

  expect(onBlur).toHaveBeenCalledWith(blurEvent);
  expect(onFocus).toHaveBeenCalledWith(focusEvent);
});

it('should not throw an error when pass empty handler', () => {
  const onBlur = undefined;
  const onFocus = undefined;
  const {result} = renderHook(() => useFocusState(onBlur, onFocus));

  act(() => {
    result.current[1](focusEvent);
    result.current[2](blurEvent);
  });
});

it('should memoize handlers', () => {
  const onBlur = jest.fn();
  const onFocus = jest.fn();
  const {result, rerender} = renderHook(() => useFocusState(onBlur, onFocus));

  const [, initialOnFocus, initialOnBlur] = result.current;

  act(() => {
    rerender({new: 'props'});
  });

  expect(result.current[2]).toBe(initialOnBlur);
  expect(result.current[1]).toBe(initialOnFocus);
});

it('should enable isFocused on focus ', () => {
  const onBlur = undefined;
  const onFocus = undefined;
  const {result} = renderHook(() => useFocusState(onBlur, onFocus));

  expect(result.current[0]).toBe(false);

  act(() => {
    result.current[1](focusEvent);
  });

  expect(result.current[0]).toBe(true);
});

it('should disable isFocused on blur', () => {
  const onBlur = undefined;
  const onFocus = undefined;
  const {result} = renderHook(() => useFocusState(onBlur, onFocus));

  act(() => {
    result.current[1](focusEvent);
  });

  expect(result.current[0]).toBe(true);

  act(() => {
    result.current[2](blurEvent);
  });

  expect(result.current[0]).toBe(false);
});
