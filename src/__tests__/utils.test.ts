import {getSymbols, isLastFilledCell} from '../utils';

describe('isLastFilledCell', () => {
  it('should work properly', () => {
    expect(isLastFilledCell('123', 1)).toBe(true);

    expect(isLastFilledCell('123', 2)).toBe(false);

    expect(isLastFilledCell('', 2)).toBe(false);
  });
});

describe('getSymbols', () => {
  it('should work properly', () => {
    expect(getSymbols('123456', 3)).toEqual(['1', '2', '3']);

    expect(getSymbols('12', 3)).toEqual(['1', '2', '']);

    expect(getSymbols('', 3)).toEqual(['', '', '']);
  });
});
