import {getStyle, getSymbols, isLastFilledCell} from '../utils';

describe('isLastFilledCell', () => {
  it('should work properly', () => {
    expect(
      isLastFilledCell({
        value: '123',
        index: 1,
      }),
    ).toBe(true);

    expect(
      isLastFilledCell({
        value: '123',
        index: 2,
      }),
    ).toBe(false);

    expect(
      isLastFilledCell({
        value: '',
        index: 2,
      }),
    ).toBe(false);
  });
});

describe('getStyle', () => {
  it('should work properly', () => {
    const styleA = {color: 'red'};
    const styleB = {color: 'gold'};

    expect(getStyle(styleA, styleB)).toEqual([styleA, styleB]);
    expect(getStyle(styleA, null)).toEqual(styleA);
    expect(getStyle(null)).toEqual(null);
  });
});

describe('getSymbols', () => {
  it('should work properly', () => {
    expect(getSymbols('123456', 3)).toEqual(['1', '2', '3']);

    expect(getSymbols('12', 3)).toEqual(['1', '2', '']);

    expect(getSymbols('', 3)).toEqual(['', '', '']);
  });
});
