import React from 'react';
import { View, Text } from 'react-native';
import CodeFiled from 'react-native-confirmation-code-field';

import styles from '../commonStyles';

export default function ActiveColor() {
  return (
    <View style={styles.rootView}>
      <Text style={styles.typing}>cellBorderWidth?: number</Text>
      <View style={styles.sectionDemo}>
        <Text style={styles.preText}>
          {`cellBorderWidthCellBorderWidthDemo={0.5}`}
        </Text>
        <CodeFiled onFulfill={console.log} cellBorderWidth={0.5} />
      </View>
      <View style={styles.sectionDemo}>
        <Text style={styles.preText}>{`cellBorderWidth={${
          CodeFiled.defaultProps.cellBorderWidth
        }} (default)`}</Text>
        <CodeFiled onFulfill={console.log} />
      </View>
      <View style={styles.sectionDemo}>
        <Text style={styles.preText}>{`cellBorderWidth={4}`}</Text>
        <CodeFiled onFulfill={console.log} cellBorderWidth={4} />
      </View>
    </View>
  );
}
