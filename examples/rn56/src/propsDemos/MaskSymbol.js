import React from 'react';
import { View, Text } from 'react-native';
import CodeFiled from 'react-native-confirmation-code-field';

import styles from '../commonStyles';

export default function MaskSymbol() {
  return (
    <View style={styles.rootView}>
      <Text style={styles.typing}>maskSymbol?: string</Text>
      <View style={styles.sectionDemo}>
        <Text style={styles.preText}>{'maskSymbol="*"'}</Text>
        <CodeFiled maskSymbol="*" />
      </View>
      <View style={styles.sectionDemo}>
        <Text style={styles.preText}>{'maskSymbol="👌"'}</Text>
        <CodeFiled maskSymbol="👌" />
      </View>
      <View style={styles.sectionDemo}>
        <Text style={styles.preText}>{`maskSymbol="😇"`}</Text>
        <CodeFiled maskSymbol="😇" />
      </View>
    </View>
  );
}
