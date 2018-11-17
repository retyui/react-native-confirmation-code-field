import React from 'react';
import { View } from 'react-native';

// eslint-disable-next-line
const LinearGradient = ({ start, end, colors, style, ...props }) => (
  <View {...props} style={[style, { backgroundColor: colors[0] }]} />
);

// export default LinearGradient;
export { default } from 'react-native-linear-gradient';
