<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [API](#api)
  - [Base props](#base-props)
    - [`onFulfill: (code: string, isMatching: ?boolean) => void`](#onfulfill-code-string-ismatching-boolean--void)
    - [`onChangeCode?: (code: string) => void`](#onchangecode-code-string--void)
    - [`autoFocus?: boolean`](#autofocus-boolean)
    - [`codeLength?: number`](#codelength-number)
    - [`defaultCode?: string`](#defaultcode-string)
    - [`compareWithCode?: string`](#comparewithcode-string)
    - [`ignoreCaseWhenCompareCode?: boolean`](#ignorecasewhencomparecode-boolean)
  - [Style props](#style-props)
    - [`maskSymbol:? string`](#masksymbol-string)
    - [`keyboardType:? KeyboardType`](#keyboardtype-keyboardtype)
    - [`activeColor?: string`](#activecolor-string)
    - [`inactiveColor?: string`](#inactivecolor-string)
    - [`cellBorderWidth?: number`](#cellborderwidth-number)
    - [`space?: number`](#space-number)
    - [`size?: number`](#size-number)
    - [`inputPosition?: 'left' | 'right' | 'center' | 'full-width'`](#inputposition-left--right--center--full-width)
    - [`variant?: 'border-box' | 'border-circle' | 'border-b' | 'border-b-t' | 'border-l-r' | 'clear'`](#variant-border-box--border-circle--border-b--border-b-t--border-l-r--clear)
  - [Customize props](#customize-props)
    - [`containerProps?: Object`](#containerprops-object)
    - [`getInputStyle?: (index: number, isFocused: boolean, hasValue: boolean) => Object`](#getinputstyle-index-number-isfocused-boolean-hasvalue-boolean--object)
    - [`getInputProps?: (index: number) => Object`](#getinputprops-index-number--object)
  - [Other props](#other-props)
    - [`testID?: any`](#testid-any)
  - [Functions](#functions)
    - [`clear = () => void`](#clear----void)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# API

## Base props

### `onFulfill: (code: string, isMatching: ?boolean) => void`

Callback function called when fulfilling code.

If `compareWithCode` is null -> return `(code)` in callback, else return `(code, isValid)`.

**Required**

### `onChangeCode?: (code: string) => void`

Callback function called when code changed.

### `autoFocus?: boolean`

Auto focus on code input, Default `false`

### `codeLength?: number`

Length of confirmation code -> number of cells. Default `5`

### `defaultCode?: string`

Default code value, must be the same length as `codeLength`

### `compareWithCode?: string`

Code to compare. if `null`, `onFulfill` callback return inputted code to check later

### `ignoreCaseWhenCompareCode?: boolean`

Ignore case when checking code. Default `false`

## Style props


### `maskSymbol:? string`

A symbol that will be displayed when the field is filled. Supports emoji.

<img width="400" src="https://raw.githubusercontent.com/retyui/react-native-confirmation-code-field/master/docs/img/maskSymbol.jpg"/>


### `keyboardType:? KeyboardType`

Determines which keyboard to open.

[All values: KeyboardType](https://github.com/facebook/react-native/blob/master/Libraries/Components/TextInput/TextInput.js#L82-L98).

Default value: `"default"`

### `activeColor?: string`

Color of cells when active. Default `#fff`. [Demo `activeColor`:](examples/rn56/src/propsDemos/ActiveColor.js)

<img width="400" src="https://raw.githubusercontent.com/retyui/react-native-confirmation-code-field/master/docs/img/activeColor.jpg"/>

### `inactiveColor?: string`

Color of cells when inactive. Default `#ffffff35`. [Demo `inactiveColor`:](examples/rn56/src/propsDemos/InactiveColor.js)

<img width="400" src="https://raw.githubusercontent.com/retyui/react-native-confirmation-code-field/master/docs/img/inactiveColor.jpg"/>

### `cellBorderWidth?: number`

Width of cell borders. Default `1`. [Demo `cellBorderWidth`:](examples/rn56/src/propsDemos/CellBorderWidth.js)

<img width="400" src="https://raw.githubusercontent.com/retyui/react-native-confirmation-code-field/master/docs/img/cellBorderWidth.jpg"/>

### `space?: number`

Space between 2 cells. Default `8`. [Demo `space`:](examples/rn56/src/propsDemos/Space.js)

<img width="400" src="https://raw.githubusercontent.com/retyui/react-native-confirmation-code-field/master/docs/img/space.jpg"/>

### `size?: number`

Size of input cells. Default `40`. [Demo `size`:](examples/rn56/src/propsDemos/Size.js)

<img width="400" src="https://raw.githubusercontent.com/retyui/react-native-confirmation-code-field/master/docs/img/size.jpg"/>

### `inputPosition?: 'left' | 'right' | 'center' | 'full-width'`

The position of code input in its container. Default `center`. [Demo `inputPosition`:](examples/rn56/src/propsDemos/InputPosition.js)

<img width="400" src="https://raw.githubusercontent.com/retyui/react-native-confirmation-code-field/master/docs/img/inputPosition.jpg"/>

### `variant?: 'border-box' | 'border-circle' | 'border-b' | 'border-b-t' | 'border-l-r' | 'clear'`

Some built-in variants. Default `border-box`. [Demo `variant`:](examples/rn56/src/propsDemos/Variant.js)

<img width="400" src="https://raw.githubusercontent.com/retyui/react-native-confirmation-code-field/master/docs/img/variant.jpg"/>

## Customize props

### `containerProps?: Object`

[`<View/>` component props](https://facebook.github.io/react-native/docs/view#props)

### `getInputStyle?: (index: number, isFocused: boolean, hasValue: boolean) => Object`

Help customize any input, must return [Style Object](https://facebook.github.io/react-native/docs/textinput#style) or `null`. [example](https://github.com/retyui/react-native-confirmation-code-field/blob/master/examples/rn56/src/realDemo/DarkExample/index.js#L36-L41)

### `getInputProps?: (index: number) => Object`

[`<TextInput/>` component props](https://facebook.github.io/react-native/docs/textinput#props)

## Other props

### `testID?: any`

Help in test

## Functions

### `clear = () => void`

Method to clear the entered code

```js
import React, { Component, createRef } from 'react';
import CodeInput from 'react-native-confirmation-code-field';

class App extends Component {
  inputRef = createRef();

  handlerOnIvalidCode() {
    this.inputRef.current.clear();
  }

  render() {
    return (
      <CodeInput
        ref={this.inputRef}
        // ...
      />
    );
  }
}
```
