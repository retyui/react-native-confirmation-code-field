# Change Log

This project adheres to [Semantic Versioning](http://semver.org/).

## 3.0.0-beta-1

- Remove base implementation based on `One code cell` === `One TextInput`
- Fix IOS fast paste SMS code
- Update `inputProps: Function` prop, now is `inputProps: ?Object`
- Remove `canPasteCode`, now it is works always by default
- Remove `inputStyle: Function` use `cellProps`
- Remove `onChangeText` use `inputProps={{onChangeText: (text) => {}}}`
- Remove some `variant` values: `border-b-t` and `border-l-r`
- Add new component `focus()` and `blur()` methods
- Fix typescript definition [#27](https://github.com/retyui/react-native-confirmation-code-field/pull/27/files)

## 2.0.5

- Fix typescript definition [#27](https://github.com/retyui/react-native-confirmation-code-field/pull/27/files)

## 2.0.4

- Fix Flow.js types
- Fix spread non-iterable instance [#24](https://github.com/retyui/react-native-confirmation-code-field/pull/24)

## 2.0.1

- Update TypeScript definition [changes](https://github.com/retyui/react-native-confirmation-code-field/commit/5e5bf0b9f912dc49bbfb5c7a24c78004374b089f#diff-b52768974e6bc0faccb7d4b75b162c99)

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
