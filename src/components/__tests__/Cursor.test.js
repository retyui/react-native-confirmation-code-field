// @flow
import React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';

import Cursor, {
  CURSOR_SYMBOL,
  CURSOR_BLINKING_ANIMATION_SPEED,
} from '../Cursor';

const render = () => shallow(<Cursor />);

test('should renter text with cursor symbol', () => {
  const wrap = render();

  expect(wrap.find(Text).props().children).toBe(CURSOR_SYMBOL);

  wrap.unmount();
});

const delay = (ms, ...args) => new Promise(res => setTimeout(res, ms, ...args));

test('should clean cursor symbol after delay', async () => {
  const wrap = render();

  expect(wrap.find(Text).props().children).toBe(CURSOR_SYMBOL);

  await delay(CURSOR_BLINKING_ANIMATION_SPEED);

  expect(
    wrap
      .update()
      .find(Text)
      .props().children,
  ).toBe('');

  wrap.unmount();
});
