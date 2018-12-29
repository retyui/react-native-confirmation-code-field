import React from 'react';
import { shallow } from 'enzyme';

import ConfirmationCodeInput from './ConfirmationCodeInput';
import TextInput from '../TextInput';
import Text from '../Text';

const defaultProps = { onFulfill: () => {} };

export const spy = (component, methodName) => {
  if (component.instance()[methodName]) {
    // eslint-disable-next-line no-undef
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

  expect(wrap.find(Text).length).toBe(codeLength);
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
        .find(Text)
        .first()
        .props();

      expect(props).toEqual(expect.objectContaining(willBeAssigned));
      expect(props).not.toEqual(expect.objectContaining(overWrittenProps));

      const lastProps = wrap
        .find(Text)
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
        .find(Text)
        .first()
        .props();

      expect(props).toEqual(expect.objectContaining(willBeAssigned));
      expect(props).not.toEqual(expect.objectContaining(overWrittenProps));
    });
  });
});

test('must change index and set value when text change', () => {
  const wrap = render();

  const [index, text] = [0, '12'];

  expect(wrap.state()).toEqual(
    expect.objectContaining({
      codeValue: '',
    }),
  );

  wrap
    .find(TextInput)
    .first()
    .prop('onChangeText')(text, index);

  wrap.update();

  expect(wrap.state()).toEqual(
    expect.objectContaining({
      codeValue: text,
    }),
  );
});

test('must call onFulfill and blur from last input when the code is full', () => {
  const onFulfill = jest.fn();
  const wrap = render({
    codeLength: 2,
    onFulfill,
  });

  const blur = spy(wrap, 'blur');

  expect(wrap.state()).toEqual(
    expect.objectContaining({
      codeValue: '',
    }),
  );

  const text = '12';

  wrap
    .find(TextInput)
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

  expect(wrap.state()).toEqual(
    expect.objectContaining({
      codeValue: '',
    }),
  );

  const text = '123456';

  wrap
    .find(TextInput)
    .first()
    .props()
    .onChangeText(text);

  wrap.update();

  expect(wrap.state()).toEqual(
    expect.objectContaining({
      codeValue: text,
    }),
  );

  // simulate onLayout fourth cell
  const cellIndex = 3;
  const layout = {
    x: 500,
    y: 500,
    width: 100,
    height: 100,
  };

  wrap
    .find(Text)
    .get(cellIndex)
    .props.onLayout(cellIndex, {
      nativeEvent: {
        layout,
      },
    });

  // simulate onPress outside the cell
  wrap
    .find(TextInput)
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
  expect(wrap.state()).toEqual(
    expect.objectContaining({
      codeValue: text,
    }),
  );

  // simulate onPress inside the cell
  wrap
    .find(TextInput)
    .first()
    .props()
    .onPress({
      nativeEvent: {
        locationX: layout.x + 1,
        locationY: layout.y + 1,
      },
    });

  wrap.update();

  expect(wrap.state()).toEqual(
    expect.objectContaining({
      codeValue: text.slice(0, cellIndex),
    }),
  );
});
