import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import styles from './styles';

const CELL_COUNT = 5;

// Inspired by
// https://github.com/retyui/react-native-confirmation-code-field/issues/129
// https://dribbble.com/shots/8020632/attachments/530078?mode=media

const UnmaskExample = () => {
  const [enableMask, setEnableMask] = useState(true);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const toggleMask = () => setEnableMask((f) => !f);
  const renderCell = ({index, symbol, isFocused}) => {
    let textChild = null;

    if (symbol) {
      textChild = enableMask ? '•' : symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Text
        key={index}
        style={[styles.cell, isFocused && styles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Show & Hide Password</Text>
      <View style={styles.fieldRow}>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={renderCell}
        />
        <Text style={styles.toggle} onPress={toggleMask}>
          {enableMask ? '🙈' : '🐵'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default UnmaskExample;
