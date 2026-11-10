import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  root: {padding: 20, minHeight: 300},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 44,
    height: 50,
    lineHeight: 48,
    fontSize: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    overflow: 'hidden',
  },
  focusCell: {
    borderColor: '#007AFF',
  },
});
