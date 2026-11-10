import {ComponentProps} from 'react';
import {render} from '@testing-library/react-native';

import {MaskSymbol} from '../MaskSymbol';

import {delay} from './delay';

type Props = ComponentProps<typeof MaskSymbol>;

const requiredProps: Props = {
  children: '',
  maskSymbol: '*',
};

const renderMaskSymbol = (props?: Partial<Props>) =>
  render(<MaskSymbol {...requiredProps} {...props} />);

it('should render children by default', () => {
  const children = '123';
  const {UNSAFE_getByType} = renderMaskSymbol({children});

  expect(UNSAFE_getByType(MaskSymbol).children).toEqual([children]);
});

it('should render maskSymbol right away when masked', () => {
  const maskSymbol = '0';
  const {UNSAFE_getByType} = renderMaskSymbol({maskSymbol, masked: true});

  expect(UNSAFE_getByType(MaskSymbol).children).toEqual([maskSymbol]);
});

it('should render maskSymbol after timeout', async () => {
  const maskSymbol = '0';
  const timeout = 100;
  const {UNSAFE_getByType} = renderMaskSymbol({maskSymbol, delay: timeout});

  await delay(timeout + 50);

  expect(UNSAFE_getByType(MaskSymbol).children).toEqual([maskSymbol]);
});
