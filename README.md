# react-native-confirmation-code-field

[![react-native-confirmation-code-field on npm](https://badgen.net/npm/v/react-native-confirmation-code-field)](https://www.npmjs.com/package/react-native-confirmation-code-field)
[![react-native-confirmation-code-field downloads](https://badgen.net/npm/dm/react-native-confirmation-code-field)](https://www.npmtrends.com/react-native-confirmation-code-field)
[![react-native-confirmation-code-field install size](https://packagephobia.com/badge?p=react-native-confirmation-code-field)](https://packagephobia.com/result?p=react-native-confirmation-code-field)
[![CI status](https://github.com/retyui/react-native-confirmation-code-field/actions/workflows/nodejs.yml/badge.svg)](https://github.com/retyui/react-native-confirmation-code-field/actions/workflows/nodejs.yml)

A simple react-native confirmation code field compatible with iOS, Android.

### Links

- [Documentation](API.md)
- [Example app](examples/DemoCodeField)
- [Live Expo app](https://snack.expo.dev/@retyui/demo-for-react-native-confirmation-code-field)

### Component features:

- 🔮 Simple and tiny `3.8 KB`. Easy to use;
- 🚀 React Compiler compatible; 

<img width="516" alt="devtools image" src="https://github.com/user-attachments/assets/208900e7-eb70-411b-93bb-17570a5f3884" />

- 🚮 Clearing part of the code by clicking on the cell;
- 🍎 Support "fast paste SMS-code" on iOS & Web. And custom code paste for Android;
- ⚡ TextInput `ref` support;
- 🛠 Highly customizable. Can be used as masked TextInput;
- 🤓 Readable [changelog](CHANGELOG.md).

## Screenshots

|     |     |
| --- | --- |
| [![react-native-confirmation-code-field animated example](https://media.giphy.com/media/huJrqF0YRrNJBTwUmz/giphy.gif)](examples/DemoCodeField/src/AnimatedExample) | [![react-native-confirmation-code-field mask example](https://media.giphy.com/media/L4HHvT9Rwdlcdj59np/giphy.gif)](examples/DemoCodeField/src/MaskExample)<br/>[![react-native-confirmation-code-field unmask example](https://media.giphy.com/media/jslJYqajRARsyANwdf/giphy.gif)](examples/DemoCodeField/src/UnmaskExample)<br/>[![react-native-confirmation-code-field underline example](https://media.giphy.com/media/XEazF64IwELNV8wZge/giphy.gif)](examples/DemoCodeField/src/UnderlineExample)<br/>[![react-native-confirmation-code-field formatting example](https://media.giphy.com/media/Y1TB1fSFtWHAdKSpZY/giphy.gif)](examples/DemoCodeField/src/FormattingExample) |

## Used by

| App | GitHub ⭐ | Google Play installs | App Store ratings |
| --- | ---: | ---: | ---: |
| [MetaMask](https://github.com/MetaMask/metamask-mobile) - crypto wallet and browser for Ethereum | 3.1k | 10M+ | 76.7k |
| [Spot the Station](https://github.com/nasa/spotthestation) - NASA app for spotting the International Space Station | 41 | 500K+ | 10.8k |
| [SubWallet](https://github.com/Koniverse/SubWallet-Mobile) - wallet for Polkadot, Substrate and Ethereum | 43 | 500K+ | 828 |
| [OneKey](https://github.com/OneKeyHQ/app-monorepo) - open source crypto wallet | 2.5k | 100K+ | 681 |
| [BC Wallet](https://github.com/bcgov/bc-wallet-mobile) - Government of British Columbia wallet for verifiable credentials | 86 | 10K+ | 33 (Canada) |
| [Ambire Wallet](https://github.com/AmbireTech/extension) - Web3 wallet for browser and mobile | 72 | 10K+ | 6 |
| [Mapeo](https://github.com/digidem/mapeo-mobile) - monitor and document the world around you | 98 | 5K+ | - |
| [Hylo](https://github.com/Hylozoic/hylo) - community coordination platform | 34 | 5K+ | 11 |
| [Ever Teams](https://github.com/ever-co/ever-teams) - work and productivity platform | 606 | 100+ | - |
| [Yosemite Crew](https://github.com/YosemiteCrew/Yosemite-Crew) - open source operating system for animal health | 2k | 50+ | 1 (Germany) |

<sub>Sorted by Google Play installs. Numbers as of November 2026. The App Store doesn't publish download counts, so the number of ratings is shown instead (US store unless noted).</sub>

## Install

```sh
yarn add react-native-confirmation-code-field
# ^^^ React 19 required!
# if you want to use it with React 18, use version 8.x.x
```

## How it works

I use an invisible `<TextInput/>` component that will be stretched over `<Cell/>` components.

JSX structure looks like that:

```jsx
// Root view (rectangle with a red border on 3d visualization below)
<View style={rootStyle}>
  // Each Cell element is result of a `renderCell` function (gray boxes)
  <Cell>1</Cell>
  <Cell>2</Cell>
  <Cell>3</Cell>
  <Cell>|</Cell>
  <Cell></Cell>
  <Cell></Cell>
  // Invisible Text Input with absolute position (gray rectangle with text '123')
  <TextInput value="123"/>
</View>
```

[![3d layout of component](https://media.giphy.com/media/oyYoYUwM3t9O7BuPDO/giphy.gif)](https://codepen.io/retyui/pen/WNGdNdJ)

It needs to solve next problems:

- When user pastes code from SMS on iOS [issue#25](https://github.com/retyui/react-native-confirmation-code-field/issues/25#issuecomment-446497934)
- Better UX when user types fast, or system sluggish, characters might lost when component switching focus between `<TextInput/>`.

## Basic example

I took a minimal implementation approach.
It mean that this component provides low-level functionality so you can create incredible UI without tears 😭.
I recommend you start with creating your own wrapper where you apply all styles and basic configuration.

You can use a ready-made solution out of the box:

- [Animated variant](examples/DemoCodeField/src/AnimatedExample)
- [Formatting example](examples/DemoCodeField/src/FormattingExample)
- [Underline variant](examples/DemoCodeField/src/UnderlineExample)
- [Show & Hide password](examples/DemoCodeField/src/UnmaskExample)
- [Mask variant](examples/DemoCodeField/src/MaskExample)

```tsx
import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet, Platform} from 'react-native';
import type {TextInputProps} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    color: '#000', // text color
  },
  focusCell: {
    borderColor: '#000',
  },
});

const CELL_COUNT = 6;
const autoComplete = Platform.select<TextInputProps['autoComplete']>({
  android: 'sms-otp',
  default: 'one-time-code',
});

function App() {
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
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={autoComplete}
        testID="my-code-input"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused && <Cursor />)}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

export default App;
```

### Compatibility

For `react-native@0.63.x` and below use `yarn add react-native-confirmation-code-field@6`, otherwise use the latest version `yarn add react-native-confirmation-code-field`

