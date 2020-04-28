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

[![Animated example](https://media.giphy.com/media/huJrqF0YRrNJBTwUmz/giphy.gif)](examples/DemoCodeField/src/AnimatedExample)

## Install

```sh
# for react-native@0.62.x and above
yarn add react-native-confirmation-code-field

# for react-native@0.61.x and below
yarn add react-native-confirmation-code-field@5
```

## How it work

I use an invisible `<TextInput/>` component that will be stretched over `<Cell/>` components. To solve next problems:

- When user pastes code from SMS on iOS [issue#25](https://github.com/retyui/react-native-confirmation-code-field/issues/25#issuecomment-446497934)
- Better UX when user types fast, or system sluggish, characters might lost when component switching focus between `<TextInput/>`.

## Basic example

I took a minimal implementation approach.
It mean that this component provides low-level functionality so you can create incredible examples without tears 😭.
I recommend you start with creating your own wrapper where you apply all styles and basic configuration.

You can use a ready-made solution out of the box:

- [Animated variant](examples/DemoCodeField/src/AnimatedExample)
- [Mask variant](examples/DemoCodeField/src/MaskExample)

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
