import React, {ComponentProps} from 'react';
import {render} from '@testing-library/react-native';
import {Cursor} from '../Cursor';
import {delay} from './delay';

type Props = ComponentProps<typeof Cursor>;

const renderCursor = (props?: Props) => render(<Cursor {...props} />);

it('should render by default cursor symbol', () => {
  const {UNSAFE_getByType} = renderCursor();

  expect(UNSAFE_getByType(Cursor).children).toEqual(['|']);
});

it('should render custom cursor symbol', () => {
  const cursorSymbol = '*';
  const {UNSAFE_getByType} = renderCursor({cursorSymbol});

  expect(UNSAFE_getByType(Cursor).children).toEqual([cursorSymbol]);
});

it('should hide cursor after timeout', async () => {
  const timeout = 100;
  const {UNSAFE_getByType} = renderCursor({delay: timeout});

  expect(UNSAFE_getByType(Cursor).children).toEqual(['|']);

  await delay(timeout + 50);

  expect(UNSAFE_getByType(Cursor).children).toEqual(['']);
});
