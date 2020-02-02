# Change Log

This project adheres to [Semantic Versioning](http://semver.org/).

## 5.0.0

New release, requirements `react>=16.4.0` & `react-native:>=0.59.0`

- stateless component and new API (see [docs](API.md))
- rewrited on TypeScript

## 4.2.0

- Add more controls on mask symbol component, inspired by [91](https://github.com/retyui/react-native-confirmation-code-field/pull/91)
- Fix android cursor alignment bug [#94](https://github.com/retyui/react-native-confirmation-code-field/pull/94). Thanks [@necipallef](https://github.com/necipallef)

## 4.1.0

- Fix problem with inherit method, rename `onTextChange => onChangeText` [#81](https://github.com/retyui/react-native-confirmation-code-field/issues/81)
- Updated type of prop `inputProps` (Flow.js & TS)
- [Release diff on npmfs.com](https://npmfs.com/compare/react-native-confirmation-code-field/4.0.0/4.1.0/)

## 4.0.0

- Fix problem with focus on Inputs [#78](https://github.com/retyui/react-native-confirmation-code-field/issues/78)

## 3.7.1

- Fix problem when cursor inherit `<Cell/>` styles [#72](https://github.com/retyui/react-native-confirmation-code-field/pull/72)

## 3.7.0

- Simulate `secureTextEntry` [#62](https://github.com/retyui/react-native-confirmation-code-field/pull/69)
- Reduce package size

## 3.6.0

- Add new prop `blurOnSubmit?: boolean` [#62](https://github.com/retyui/react-native-confirmation-code-field/pull/62) by [leozzitowned](https://github.com/leozzitowned)

## 3.5.0

- Add new prop `CellComponent?: ComponentType`, it can be useful for create some animations [Example](https://github.com/retyui/react-native-confirmation-code-field/tree/master/examples/src/realDemo/AnimatedExample)

## 3.4.1

- Add RTL support [#55](https://github.com/retyui/react-native-confirmation-code-field/pull/55) by [bamlhs](https://github.com/bamlhs)

## 3.4.0

- Added support for `react-native-web` [#50](https://github.com/retyui/react-native-confirmation-code-field/issues/50)

## 3.3.0

- Added new prop `normalizeCode: (code: string) => string` via [#47](https://github.com/retyui/react-native-confirmation-code-field/issues/47) [#41](https://github.com/retyui/react-native-confirmation-code-field/pull/41)

## 3.2.3

- Fix onPress event handler [#45](https://github.com/retyui/react-native-confirmation-code-field/issues/45)

## 3.2.2

- Update typings [#43 index.d.ts](https://github.com/retyui/react-native-confirmation-code-field/pull/43/files#diff-b52768974e6bc0faccb7d4b75b162c99)
- Add example how work with `paste()` and `clean()` to README.md [#43 README.md](https://github.com/retyui/react-native-confirmation-code-field/pull/43/files#diff-04c6e90faac2675aa89e2176d2eec7d8)
- Recreate example for RN@0.59
- Update `devDependencies`

## 3.2.1

- Fix issue about `testID` [#38](https://github.com/retyui/react-native-confirmation-code-field/issues/38)

## 3.2.0

- Fix Flow.js error for support `react-native@0.58` [#33](https://github.com/retyui/react-native-confirmation-code-field/pull/33)

## 3.1.3

- Fix `autoFucus` prop [#32](https://github.com/retyui/react-native-confirmation-code-field/pull/32)

## 3.1.0

- Fix iOS borderBottom style [#28](https://github.com/retyui/react-native-confirmation-code-field/pull/28/files)

## 3.0.0

- Remove base implementation based on `One code cell` === `One TextInput`
- Fix iOS fast paste SMS code
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
- Merged changes from `1.2.1` version
- Update dependencies
  > RN@0.57 - Fixed extreme `<TextInput>` slowness ([5017b86](https://github.com/facebook/react-native/commit/5017b86) by [@gnprice](https://github.com/gnprice))
- Remove `ignoreCaseWhenCompareCode` and `compareWithCode` props.
- Add paste support. By default it's disabled. That would enable set `canPasteCode={true}`
- Rename property `getInputProps` => `inputProps`
- Rename property `getInputStyle` => `inputStyle`
- Remove iOS hack for `onKeyPress` (use latest RN version)
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
- Fix iOS input bag. [#38](https://github.com/ttdung11t2/react-native-confirmation-code-input/pull/38/files)

# 0.0.0

- Fork dead repository
