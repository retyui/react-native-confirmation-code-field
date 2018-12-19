import React from 'react';
import { Text, View } from 'react-native';
import CodeFiled from 'react-native-confirmation-code-field';

import styles from '../commonStyles';

export default function Variant() {
  return (
    <View style={styles.rootView}>
      <Text style={styles.typing}>variant?: ENUM()</Text>
      <View style={styles.sectionDemo}>
        <Text style={styles.preText}>{`variant="${
          CodeFiled.defaultProps.variant
        }" (default)`}</Text>
        <CodeFiled onFulfill={console.log} />
      </View>
      <View style={styles.sectionDemo}>
        <Text style={styles.preText}>{'variant="border-circle"'}</Text>
        <CodeFiled onFulfill={console.log} variant="border-circle" />
      </View>
      <View style={styles.sectionDemo}>
        <Text style={styles.preText}>{'variant="border-b"'}</Text>
        <CodeFiled onFulfill={console.log} variant="border-b" />
      </View>
      <View style={styles.sectionDemo}>
        <Text style={styles.preText}>{'variant="clear"'}</Text>
        <CodeFiled onFulfill={console.log} variant="clear" />
      </View>
    </View>
  );
}
