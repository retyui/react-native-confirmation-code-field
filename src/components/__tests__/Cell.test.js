// @flow
import React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';

import Cell from '../TextCustom';

const defaultProps = { index: 0 };

const render = props => shallow(<Cell {...defaultProps} {...props} />);

test('should call onLayout with index and LayoutEvent', () => {
  const index = 12;
  const onLayout = jest.fn();

  const wrap = render({
    index,
    onLayout,
  });

  const event = { some: 'data' };

  expect(onLayout).toHaveBeenCalledTimes(0);

  wrap
    .find(Text)
    .props()
    .onLayout(event);

  expect(onLayout).toHaveBeenCalledTimes(1);

  expect(onLayout).toHaveBeenCalledWith(index, event);
});

test('should work correctly when onPress not passed', () => {
  const wrap = render();
  const event = { some: 'data' };

  wrap
    .find(Text)
    .props()
    .onLayout(event);
});
