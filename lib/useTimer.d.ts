export declare const useInterval: <Args extends any[]>(callback: (...a: Args) => any, delay: number, deps: any[]) => [(...a: Args) => void, () => void];
export declare const useTimeout: <Args extends any[]>(callback: (...a: Args) => any, delay: number, deps: any[]) => [(...a: Args) => void, () => void];
