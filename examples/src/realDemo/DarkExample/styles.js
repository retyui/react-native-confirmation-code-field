import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  linearGradient: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    minHeight: 555,
  },

  inputLabel: {
    paddingTop: 100,
    paddingBottom: 10,
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  inputSubLabel: {
    color: 'rgba(255,255,255,.7)',
  },
  inputWrapStyle: {
    height: 60,
    marginTop: 30,
  },
  input: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#000',
    color: '#fff',
    backgroundColor: '#030c31',
    fontSize: 30,
    fontWeight: '700',
  },
  inputNotEmpty: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  resetCode: {
    marginTop: 25,
    color: '#4b5ba4',
  },
  nextButton: {
    marginTop: 80,
    height: 70,
    borderRadius: 2,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 5,
      },
    }),
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
