import React from 'react';
import { View, Text } from 'react-native';
import CodeFiled from 'react-native-confirmation-code-field';

import styles from '../commonStyles';

export default function InactiveColor() {
  return (
    <View style={styles.rootView}>
      <Text style={styles.typing}>inactiveColor?: string</Text>
      <View style={styles.sectionDemo}>
        <Text style={styles.preText}>{'inactiveColor="red"'}</Text>
        <CodeFiled onFulfill={console.log} inactiveColor="red" />
      </View>
      <View style={styles.sectionDemo}>
        <Text style={styles.preText}>
          {`inactiveColor="${CodeFiled.defaultProps.inactiveColor}" (default)`}
        </Text>
        <CodeFiled onFulfill={console.log} />
      </View>
      <View style={styles.sectionDemo}>
        <Text style={styles.preText}>{'inactiveColor="blue"'}</Text>
        <CodeFiled onFulfill={console.log} inactiveColor="blue" />
      </View>
    </View>
  );
}
