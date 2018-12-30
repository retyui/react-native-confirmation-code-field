// @flow
import React from 'react';
import { shallow } from 'enzyme';

import TextInputCustom from '../TextInputCustom.js';
import { spy } from '../ConfirmationCodeInput/ConfirmationCodeInput.test.js';

const defaultProps = {};

const render = props =>
  shallow(<TextInputCustom {...defaultProps} {...props} />);

test('should call onPress', () => {
  const onPress = jest.fn();

  const wrap = render({
    onPress,
  });

  const event = { some: 'data' };

  expect(onPress).toHaveBeenCalledTimes(0);

  wrap.instance()._onPress(event);

  expect(onPress).toHaveBeenCalledTimes(1);

  expect(onPress).toHaveBeenCalledWith(event);
});

test('should call super method _onPress', () => {
  const wrap = render();
  const event = { some: 'data' };

  const focus = spy(wrap, 'focus');

  expect(focus).toHaveBeenCalledTimes(0);

  wrap.instance()._onPress(event);

  expect(focus).toHaveBeenCalledTimes(1);
});
