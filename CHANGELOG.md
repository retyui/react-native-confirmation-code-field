# Change Log

This project adheres to [Semantic Versioning](http://semver.org/).

## 2.0.0

- New example for RN 0.57 version
- Merged cnages from `1.2.1` version
- Update dependencies
  > RN@0.57 - Fixed extreme `<TextInput>` slowness ([5017b86](https://github.com/facebook/react-native/commit/5017b86) by [@gnprice](https://github.com/gnprice))
- Remove `ignoreCaseWhenCompareCode` and `compareWithCode` props.
- Add paste support. By default it's disabled. That would enable set `canPasteCode={true}`
- Rename property `getInputProps` => `inputProps`
- Rename property `getInputStyle` => `inputStyle`
- Remove IOS hack for `onKeyPress` (use latest RN version)
- Remove `INDEX` typing
- Fix desynchronization `onFocus` and `setState`
  [#16](https://github.com/retyui/react-native-confirmation-code-field/issues/16)

## 1.2.3

- Fix desynchronization `onFocus` and `setState`
  [#16](https://github.com/retyui/react-native-confirmation-code-field/issues/16)

## 1.2.1

- Add export for types [#10](https://github.com/retyui/react-native-confirmation-code-field/pull/10)

## 1.2.0

- Add new prop `maskSymbol?: string` [#6](https://github.com/retyui/react-native-confirmation-code-field/issues/6)

## 1.1.0

- Add `keyboardType` prop [#4](https://github.com/retyui/react-native-confirmation-code-field/pull/4)
- Fix typescript module name [#3](https://github.com/retyui/react-native-confirmation-code-field/pull/3)

## 1.0.0

- Rename `ignoreCase` => `ignoreCaseWhenCompareCode` property
- Rename `className` => `variant` property

- Add new methods (`getInputStyle()`and `getInputProps()`\_ for help users to customize inputs
- Add new property `containerProps`, `testID`
- Add `onChangeCode()` callback and `defaultCode` props. [#22](https://github.com/ttdung11t2/react-native-confirmation-code-input/pull/22)[#33](https://github.com/ttdung11t2/react-native-confirmation-code-input/pull/33/files)
- Add `clear()` method to TypeScript definition [#21](https://github.com/ttdung11t2/react-native-confirmation-code-input/pull/21)

- Fix slowly focus change [10](https://github.com/ttdung11t2/react-native-confirmation-code-input/pull/10)
- Fix IOS input bag. [#38](https://github.com/ttdung11t2/react-native-confirmation-code-input/pull/38/files)

# 0.0.0

- Fork dead repo
