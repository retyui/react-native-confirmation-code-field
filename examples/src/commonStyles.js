import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  rootView: {
    backgroundColor: '#000',
    minHeight: 500,
    borderBottomWidth: 1,
    borderBottomColor: 'gold',
  },
  sectionDemo: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 2,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  preText: {
    fontFamily: Platform.select({
      ios: 'Courier New',
      android: 'monospace',
    }),
    color: '#fff',
  },
  typing: {
    textAlign: 'center',
    fontFamily: Platform.select({
      ios: 'Courier New',
      android: 'monospace',
    }),
    color: '#fff',
    fontSize: 20,
    marginTop: 15,
    marginBottom: 10,
  },
});
