import React, {useState} from 'react';
import { Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  CodeField,
  Cursor,
  useClearByFocusCell,
  MaskSymbol,
} from 'react-native-confirmation-code-field';

import styles from './styles';

const CELL_COUNT = 6;
const rootProps = {style: styles.codeFieldRoot};

const MaskExample = () => {
  const [value, setValue] = useState('');
  const {inputProps, getCellOnLayoutHandler} = useClearByFocusCell({
    value,
    setValue,
    cellCount: CELL_COUNT,
  });
  const renderCell = ({index, symbol, isFocused, isPrevFilled}) => {
    let textChild = null;

    if (symbol) {
      textChild = (
        <MaskSymbol
          maskSymbol="❤️"
          masked={isPrevFilled}>
          {symbol}
        </MaskSymbol>
      );
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
      <Text style={styles.title}>Field with custom mask</Text>
      <CodeField
        blurOnFulfill
        {...inputProps}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        RootProps={rootProps}
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
    </SafeAreaView>
  );
};

export default MaskExample;
