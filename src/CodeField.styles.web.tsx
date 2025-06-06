import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textInput: {
    // <TextInput/> will be rendered above Cells
    ...StyleSheet.absoluteFillObject,
    // Hide <TextInput/> to simulate that user will press into a cell
    opacity: 0.015,
    // >>>>>> Web only styles <<<<<
    width: '100%',
    // Fix iOS Safari aggressive zoom
    fontSize: 16,
  },
});
