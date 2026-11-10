import React, {useState} from 'react';
import { Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import styles from './styles';

const CELL_COUNT = 4;
const rootProps = {style: styles.codeFieldRoot};

const UnderlineExample = () => {
  const [value, setValue] = useState('');
  const {inputProps, getCellOnLayoutHandler} = useClearByFocusCell({
    value,
    setValue,
    cellCount: CELL_COUNT,
  });

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Underline example</Text>
      <CodeField
        // No `blurOnFulfill` here: the field keeps focus so the user can still edit a complete code
        {...inputProps}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        RootProps={rootProps}
        textContentType="oneTimeCode"
        renderCell={({
          index,
          symbol,
          isFocused,
          isFieldFocused,
          isFilled,
          isLast,
        }) => (
          <View
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[
              styles.cellRoot,
              // When the code is complete no cell is "focused", so keep the last one highlighted
              (isFocused || (isFieldFocused && isFilled && isLast)) &&
                styles.focusCell,
            ]}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default UnderlineExample;
