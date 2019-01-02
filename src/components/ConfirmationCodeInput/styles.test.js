// @flow
import { findCellHeight } from './styles';

test('should work correctly', () => {
  const size = 69;

  expect(findCellHeight(size, null)).toBe(size);
  expect(findCellHeight(size, {})).toBe(size);
  expect(findCellHeight(size, [{}, null])).toBe(size);
  expect(findCellHeight(size, [{ height: 31 }, null])).toBe(31);
});
