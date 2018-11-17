import React from 'react';
import { View, Text } from 'react-native';
import CodeFiled from 'react-native-confirmation-code-field';

import styles from '../commonStyles';

export default function Size() {
  return (
    <View style={styles.rootView}>
      <Text style={styles.typing}>size?: number</Text>
      <View style={styles.sectionDemo}>
        <Text style={styles.preText}>{`size={20}`}</Text>
        <CodeFiled onFulfill={console.log} size={20} />
      </View>
      <View style={styles.sectionDemo}>
        <Text style={styles.preText}>{`size={${
          CodeFiled.defaultProps.size
        } (default)`}</Text>
        <CodeFiled onFulfill={console.log} />
      </View>
      <View style={styles.sectionDemo}>
        <Text style={styles.preText}>{`size={60}`}</Text>
        <CodeFiled onFulfill={console.log} size={60} />
      </View>
    </View>
  );
}
