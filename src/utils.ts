export const DEFAULT_BLINKING_SPEED = 500;

export const getSymbols = (codeValue: string, codeLength: number): string[] => {
  const symbols = new Array<string>(codeLength);
  for (let i = 0; i < codeLength; i++) {
    symbols[i] = codeValue[i] ?? '';
  }
  return symbols;
};
