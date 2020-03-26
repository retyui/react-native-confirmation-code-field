import { NativeSyntheticEvent } from 'react-native';
declare const useEvent: <Event_1 extends NativeSyntheticEvent<any>>(nativeEvent: ((event: Event_1) => void) | undefined, customHandler: () => void) => (event: Event_1) => void;
export default useEvent;
