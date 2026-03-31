import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textInput: {
    // <TextInput/> will be rendered above Cells
    ...StyleSheet.absoluteFill,
    // Hide <TextInput/> to simulate that user will press into a cell
    opacity: 0.015,
    // Each user press into <TextInput/> should always set the cursor on the end of a text value
    fontSize: 1,
  },
});
