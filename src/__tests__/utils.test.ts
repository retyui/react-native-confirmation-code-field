import {getSymbols} from '../utils';

describe('getSymbols', () => {
  it('should work properly', () => {
    expect(getSymbols('123456', 3)).toEqual(['1', '2', '3']);

    expect(getSymbols('12', 3)).toEqual(['1', '2', '']);

    expect(getSymbols('', 3)).toEqual(['', '', '']);
  });
});
