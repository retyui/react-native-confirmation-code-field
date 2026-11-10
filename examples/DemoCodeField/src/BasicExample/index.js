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

const BasicExample = () => {
  const [value, setValue] = useState('');
  const [submittedCode, setSubmittedCode] = useState('');
  const {inputProps, getCellOnLayoutHandler} = useClearByFocusCell({
    value,
    setValue,
    cellCount: CELL_COUNT,
  });

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Basic example</Text>
      <CodeField
        {...inputProps}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        RootProps={rootProps}
        textContentType="oneTimeCode"
        // Hide the keyboard and "send" the code once every cell is filled
        blurOnFulfill
        onFulfill={setSubmittedCode}
        // Screen readers focus the invisible input, so give it a label...
        accessibilityLabel="Verification code"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
            // ...and hide the cells, they only draw the input's value
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants">
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <Text style={styles.status}>
        {submittedCode && value === submittedCode
          ? `Verifying ${submittedCode}…`
          : ' '}
      </Text>
    </SafeAreaView>
  );
};

export default BasicExample;
