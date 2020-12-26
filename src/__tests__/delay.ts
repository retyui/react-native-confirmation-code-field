export const delay = (ms: number) =>
  new Promise<void>((res) => setTimeout(res, ms));
