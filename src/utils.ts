import type {Ref} from 'react';

export const DEFAULT_BLINKING_SPEED = 500;

// Strips whitespace and dashes so pasted/autofilled codes like "123 456" or "123-456" fit the cells
export const defaultNormalize = (text: string): string =>
  text.replace(/[\s-]/g, '');

export const getSymbols = (codeValue: string, codeLength: number): string[] => {
  const symbols = new Array<string>(codeLength);
  for (let i = 0; i < codeLength; i++) {
    symbols[i] = codeValue[i] ?? '';
  }
  return symbols;
};

const assignRef = <T>(ref: Ref<T> | undefined, node: T | null) => {
  if (typeof ref === 'function') {
    return ref(node);
  }
  if (ref) {
    ref.current = node;
  }
};

// Returns a React 19 callback ref that writes `node` to both refs
export const mergeRefs =
  <T>(innerRef: {current: T | null}, outerRef: Ref<T> | undefined) =>
  (node: T | null) => {
    innerRef.current = node;
    const cleanup = assignRef(outerRef, node);
    return () => {
      innerRef.current = null;
      if (typeof cleanup === 'function') {
        cleanup();
      } else {
        assignRef(outerRef, null);
      }
    };
  };
