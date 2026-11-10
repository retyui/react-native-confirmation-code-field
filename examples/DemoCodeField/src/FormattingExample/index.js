import React, {useState, Fragment} from 'react';
import { Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import styles from './styles';

const CELL_COUNT = 9;
const rootProps = {style: styles.codeFieldRoot};

const FormattingExample = () => {
  const [value, setValue] = useState('');
  const {inputProps, getCellOnLayoutHandler} = useClearByFocusCell({
    value,
    setValue,
    cellCount: CELL_COUNT,
  });

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Social Security number</Text>
      <CodeField
        blurOnFulfill
        {...inputProps}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        RootProps={rootProps}
        textContentType="oneTimeCode"
        // Pasting "123-45-6789" works too: dashes are removed by the default `normalize`
        renderCell={({index, symbol, isFocused}) => (
          <Fragment key={index}>
            <Text
              key={`value-${index}`}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
            {index === 2 || index === 4 ? (
              <View key={`separator-${index}`} style={styles.separator} />
            ) : null}
          </Fragment>
        )}
      />
    </SafeAreaView>
  );
};

export default FormattingExample;
