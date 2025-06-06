export function isLastFilledCell(
  value: string | null | undefined,
  index: number,
): boolean {
  return value != null && value.length - 2 === index;
}

export function getSymbols(codeValue: string, codeLength: number): string[] {
  const symbols = new Array<string>(codeLength);
  for (let i = 0; i < codeLength; i++) {
    symbols[i] = codeValue[i] ?? '';
  }
  return symbols;
}
