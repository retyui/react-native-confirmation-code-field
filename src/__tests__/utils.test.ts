import {createRef} from 'react';

import {defaultNormalize, getSymbols, mergeRefs} from '../utils';

describe('defaultNormalize', () => {
  it('should remove whitespace and dashes', () => {
    expect(defaultNormalize('123 456')).toBe('123456');
    expect(defaultNormalize('123-456')).toBe('123456');
    expect(defaultNormalize(' 12\n3 ')).toBe('123');
    expect(defaultNormalize('AB12')).toBe('AB12');
  });
});

describe('getSymbols', () => {
  it('should work properly', () => {
    expect(getSymbols('123456', 3)).toEqual(['1', '2', '3']);

    expect(getSymbols('12', 3)).toEqual(['1', '2', '']);

    expect(getSymbols('', 3)).toEqual(['', '', '']);
  });
});

describe('mergeRefs', () => {
  const node = {name: 'node'};

  it('should assign node to inner and object refs, and reset them on cleanup', () => {
    const inner = {current: null as typeof node | null};
    const outer = createRef<typeof node>();

    const cleanup = mergeRefs(inner, outer)(node);
    expect(inner.current).toBe(node);
    expect(outer.current).toBe(node);

    cleanup();
    expect(inner.current).toBeNull();
    expect(outer.current).toBeNull();
  });

  it('should call callback ref with null on cleanup', () => {
    const inner = {current: null as typeof node | null};
    const outer = jest.fn();

    mergeRefs(inner, outer)(node)();
    expect(outer.mock.calls).toEqual([[node], [null]]);
  });

  it('should call the cleanup returned by a callback ref instead of passing null', () => {
    const inner = {current: null as typeof node | null};
    const outerCleanup = jest.fn();
    const outer = jest.fn(() => outerCleanup);

    mergeRefs(inner, outer)(node)();
    expect(outer.mock.calls).toEqual([[node]]);
    expect(outerCleanup).toHaveBeenCalledTimes(1);
  });

  it('should work without an outer ref', () => {
    const inner = {current: null as typeof node | null};

    expect(() => mergeRefs(inner, undefined)(node)()).not.toThrow();
  });
});
