# Migrate to this version

`autoFocus` property default was ~~`true`~~ but now is `false`

---

It's bad idea:

"~~This component uses the same props as . Below are additional props for this component:~~"

Now use new property [`inputProps`](https://github.com/retyui/react-native-confirmation-code-field/blob/master/docs/API.md#inputprops-index-number--object), example:

```js
const TextInputPropsObject = {
  secureTextEntry: true,
};

<CodeInput
  inputProps={(index: number) => TextInputPropsObject}
  // ...
/>;
```

---

### `onFulfill` changed the method signature

`onFulfill = (code:string) => void`

_used to be so:_

~~`onFulfill = (isValid: boolean, code:string) => void`~~

---

| Deprecated Prop                                   | Description                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `codeInputStyle`                                  | Use [`inputStyle(index,isFocused,hasValue)`](https://github.com/retyui/react-native-confirmation-code-field/blob/master/docs/API.md#inputprops-index-number--object) to set custom style, [example](https://github.com/retyui/react-native-confirmation-code-field/blob/e73836bfbf144bf614d15532b9ae7c250d3b4fda/examples/src/realDemo/DarkExample/index.js#L35-L40) |
| `containerStyle`                                  | Use [`containerProps`](https://github.com/retyui/react-native-confirmation-code-field/blob/master/docs/API.md#containerprops-object) to set style, [example](https://github.com/retyui/react-native-confirmation-code-field/blob/e73836bfbf144bf614d15532b9ae7c250d3b4fda/examples/src/realDemo/DarkExample/index.js#L76)                                            |
| `ignoreCaseWhenCompareCode` and `compareWithCode` | Not supported, use own implementation [`onFulfill`](https://github.com/retyui/react-native-confirmation-code-field/blob/master/docs/API.md#onfulfill-code-string--void) to validate code                                                                                                                                                                             |
| `className`                                       | Renamed, use [`variant`](https://github.com/retyui/react-native-confirmation-code-field/blob/master/docs/API.md#variant-border-box--border-circle--border-b--border-b-t--border-l-r--clear)                                                                                                                                                                          |
