# Migrate to this version

`autoFocus` property default was ~~`true`~~ but now is `false`

--- 

It's bad idea:
"~~This component uses the same props as . Below are additional props for this component:~~"

Now use new property `getInputProps`, example:

```js
const TextInputPropsObject = {
  secureTextEntry: true,
};

<CodeInput 
  getInputProps={(index: number) => TextInputPropsObject}
   // ...
/>;
```

---

### `onFulfill` changed the method signature

When `compareWithCode` not falsy, method will be called with such arguments:

`onFulfill = (code:string, isValid: boolean) => void`

_used to be so:_

~~`onFulfill = (isValid: boolean, code:string) => void`~~

---

| Deprecated Prop  | Description                                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| `codeInputStyle` | Use `getInputStyle(index,isFocused,hasValue)` to set custom style, [example](https://github.com/retyui/react-native-confirmation-code-field/blob/master/examples/rn56/src/realDemo/DarkExample/index.js#L36-L41) |
| `containerStyle` | Use `containerProps` to set style, [example](https://github.com/retyui/react-native-confirmation-code-field/blob/master/examples/rn56/src/realDemo/DarkExample/index.js#L48)                                       |
| `ignoreCase`     | Renamed, use `ignoreCaseWhenCompareCode`                                                                             |
| `className`      | Renamed, use `variant`                                                                                           |
