# react-native-confirmation-code-field

[![npm](https://img.shields.io/npm/v/react-native-confirmation-code-field.svg)](https://www.npmjs.com/package/react-native-confirmation-code-field)
[![npm downloads](https://img.shields.io/npm/dm/react-native-confirmation-code-field.svg)](https://www.npmtrends.com/react-native-confirmation-code-field)
![Node.js CI](https://github.com/retyui/react-native-confirmation-code-field/workflows/Node.js%20CI/badge.svg)

A react-native confirmation code field compatible with iOS, Android

### Links

- [Documentation](API.md)
- [Example app](examples/DemoCodeField)

### Component features:

- 🔮 Simple. Easy to use;
- 🚮 Clearing part of the code by clicking on the cell;
- 🍎 Support "fast paste SMS-code" on iOS. And custom code paste for Android;
- ⚡ TextInput `ref` support;
- 🛠 Extendable and hackable;
- 🤓 Readable [changelog](CHANGELOG.md).

## Screenshots

<img width="250" src="https://raw.githubusercontent.com/retyui/react-native-confirmation-code-field/4.x/docs/img/animated.gif"/><img width="250" src="https://raw.githubusercontent.com/retyui/react-native-confirmation-code-field/4.x/docs/img/red.gif"/><img width="250" src="https://raw.githubusercontent.com/retyui/react-native-confirmation-code-field/4.x/docs/img/dark.gif"/>

## Install

```sh
yarn add react-native-confirmation-code-field

# for react-native@0.62.x and above
yarn add react-native-confirmation-code-field@next
```

## How it work

I use an invisible `<TextInput/>` component that will be stretched over `<Cell/>` components to have ability paste code normally on iOS [issue#25](https://github.com/retyui/react-native-confirmation-code-field/issues/25#issuecomment-446497934)

```js
import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFiledRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});

const CELL_COUNT = 6;

const App = () => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Verification</Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
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

export default App;
```
