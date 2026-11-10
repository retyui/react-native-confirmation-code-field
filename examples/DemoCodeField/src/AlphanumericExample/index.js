import React, {useState} from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import styles from './styles';

const CELL_COUNT = 6;
const rootProps = {style: styles.codeFieldRoot};

// Keep letters and digits only, in upper case, so "ab-12 cd" becomes "AB12CD"
const normalize = (text) => text.replace(/[^a-z0-9]/gi, '').toUpperCase();

const AlphanumericExample = () => {
  const [value, setValue] = useState('');
  const {inputProps, getCellOnLayoutHandler} = useClearByFocusCell({
    value,
    setValue,
    cellCount: CELL_COUNT,
  });

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Letters and digits</Text>
      <CodeField
        blurOnFulfill
        {...inputProps}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        RootProps={rootProps}
        // The default keyboard is a number pad, switch to the full one for letters
        keyboardType="default"
        autoCapitalize="characters"
        normalize={normalize}
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

export default AlphanumericExample;
