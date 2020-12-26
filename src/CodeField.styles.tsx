import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textInput: {
    // <TextInput/> will be rendered above Cells
    ...StyleSheet.absoluteFillObject,
    // Hide <TextInput/> to simulate that user will press into a cell
    opacity: 0.01,
    // Each user press into <TextInput/> should always set the cursor on the end of a text value
    fontSize: 1,
    ...Platform.select({
      web: {
        width: '100%',
        // Fix iOS Safari aggressive zoom
        fontSize: 16,
      },
    }),
  },
});
