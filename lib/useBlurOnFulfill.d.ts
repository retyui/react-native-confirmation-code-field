/// <reference types="react" />
import { TextInput } from 'react-native';
declare type Options = {
    value?: string;
    cellCount: number;
};
declare const useBlurOnFulfill: ({ value, cellCount }: Options) => import("react").RefObject<TextInput>;
export default useBlurOnFulfill;
