import React from 'react';
import { View, Text } from 'react-native';
import CodeFiled from 'react-native-confirmation-code-field';

import styles from '../commonStyles';

export default function ActiveColor() {
  return (
    <View style={styles.rootView}>
      <Text style={styles.typing}>activeColor?: string</Text>
      <View style={styles.sectionDemo}>
        <Text style={styles.preText}>{'activeColor="gold"'}</Text>
        <CodeFiled onFulfill={console.log} activeColor="gold" />
      </View>
      <View style={styles.sectionDemo}>
        <Text style={styles.preText}>{`activeColor="${
          CodeFiled.defaultProps.activeColor
        }" (default)`}</Text>
        <CodeFiled onFulfill={console.log} />
      </View>
      <View style={styles.sectionDemo}>
        <Text style={styles.preText}>{'activeColor="pink"'}</Text>
        <CodeFiled onFulfill={console.log} activeColor="pink" />
      </View>
    </View>
  );
}
