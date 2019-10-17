// @flow
import React from 'react';
import { shallow } from 'enzyme';
import { View } from 'react-native';

import TextInputCustom from '../TextInputCustom';
import Cell from '../Cell';

import ConfirmationCodeInput from './ConfirmationCodeInput';

const defaultProps = { onFulfill: () => {} };

export const spy = (component: any, methodName: string) => {
  if (component.instance()[methodName]) {
    // eslint-disable-next-line no-undef
    // $FlowFixMe
    const newMethod = jest.fn();

    component.instance()[methodName] = newMethod;

    return newMethod;
  }

  throw new Error(`Method: ${methodName} undefined in instance`);
};

const render = props =>
  shallow(<ConfirmationCodeInput {...defaultProps} {...props} />);

test('Text count must be equal codeLength', () => {
  const codeLength = 12;
  const wrap = render({
    codeLength,
  });

  expect(wrap.find(Cell).length).toBe(codeLength);
});

describe('cellProps', () => {
  const overWrittenProps = {
    index: 123,
    onLayout: () => {},
    style: { color: 'gold' },
  };

  const willBeAssigned = {
    a: 'b',
    b: 'a',
  };

  describe('cellProps: () => TextProps', () => {
    test('must assign custom props to first Cell', () => {
      const cellProps = jest.fn(({ index }) =>
        index === 0
          ? {
              ...overWrittenProps,
              ...willBeAssigned,
            }
          : null,
      );
      const codeLength = 3;
      const wrap = render({
        codeLength,
        cellProps,
      });

      expect(cellProps).toHaveBeenCalledTimes(codeLength);

      const props = wrap
        .find(Cell)
        .first()
        .props();

      expect(props).toEqual(expect.objectContaining(willBeAssigned));
      expect(props).not.toEqual(expect.objectContaining(overWrittenProps));

      const lastProps = wrap
        .find(Cell)
        .last()
        .props();

      expect(lastProps).not.toEqual(expect.objectContaining(willBeAssigned));
    });
  });

  describe('cellProps: TextProps', () => {
    test('must assign custom props to all Cells', () => {
      const cellProps = {
        ...overWrittenProps,
        ...willBeAssigned,
      };
      const codeLength = 5;
      const wrap = render({
        codeLength,
        cellProps,
      });

      const props = wrap
        .find(Cell)
        .first()
        .props();

      expect(props).toEqual(expect.objectContaining(willBeAssigned));
      expect(props).not.toEqual(expect.objectContaining(overWrittenProps));
    });
  });
});

test('must change index and set value when text change', () => {
  const wrap = render();

  const text = '12';

  expect(wrap.state().codeValue).toEqual('');

  wrap
    .find(TextInputCustom)
    .first()
    .prop('onChangeText')(text);

  wrap.update();

  expect(wrap.state().codeValue).toEqual(text);
});

test('must call onFulfill and blur from last input when the code is full', () => {
  const onFulfill = jest.fn();
  const wrap = render({
    codeLength: 2,
    onFulfill,
  });

  const blur = spy(wrap, 'blur');

  expect(wrap.state().codeValue).toEqual('');

  const text = '12';

  wrap
    .find(TextInputCustom)
    .first()
    .props()
    .onChangeText(text);

  wrap.update();

  expect(onFulfill).toHaveBeenCalledTimes(1);
  expect(onFulfill).toHaveBeenCalledWith(text);

  expect(blur).toHaveBeenCalledTimes(1);
});

test('must clear code starting from clicked cell', () => {
  const wrap = render({
    codeLength: 7,
  });

  expect(wrap.state().codeValue).toEqual('');

  const text = '123456';

  wrap
    .find(TextInputCustom)
    .first()
    .props()
    .onChangeText(text);

  wrap.update();

  expect(wrap.state().codeValue).toEqual(text);

  // simulate onLayout fourth cell
  const cellIndex = 3;
  const layout = {
    x: 500,
    y: 500,
    width: 100,
    height: 100,
  };

  wrap
    .find(Cell)
    .get(cellIndex)
    // $FlowFixMe
    .props.onLayout({
      nativeEvent: {
        layout,
      },
    });

  // simulate onPress outside the cell
  wrap
    .find(TextInputCustom)
    .first()
    .props()
    .onPress({
      nativeEvent: {
        locationX: layout.x - 1,
        locationY: layout.y - 1,
      },
    });

  wrap.update();

  // nothing changed
  expect(wrap.state().codeValue).toEqual(text);

  // simulate onPress inside the cell
  wrap
    .find(TextInputCustom)
    .first()
    .props()
    .onPress({
      nativeEvent: {
        locationX: layout.x + 1,
        locationY: layout.y + 1,
      },
    });

  wrap.update();

  expect(wrap.state().codeValue).toEqual(text.slice(0, cellIndex));
});

test('should init state with truncated codeValue based by defaultCode', () => {
  const defaultCode = '123467890';
  const codeLength = 7;
  const wrap = render({
    codeLength,
    defaultCode,
  });

  expect(wrap.state().codeValue).toBe(defaultCode.slice(0, codeLength));
});

test('should pass testID to root <View/> component', () => {
  const testID = '123';
  const wrap = render({ testID });

  // $FlowFixMe
  expect(wrap.get(0).type).toBe(View);
  // $FlowFixMe
  expect(wrap.get(0).props.testID).toBe(testID);
});

test('should call onTextChange from inputProps', () => {
  const onChangeText = jest.fn();
  const inputProps = { onChangeText };
  const wrap = render({ inputProps });
  const text = '123';

  expect(onChangeText).toHaveBeenCalledTimes(0);

  wrap
    .find(TextInputCustom)
    .first()
    .prop('onChangeText')(text);

  expect(onChangeText).toHaveBeenCalledTimes(1);
  expect(onChangeText).toHaveBeenCalledWith(text);
});
