<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [API](#api)
  - [Base props](#base-props)
    - [`onFulfill: (code: string) => void`](#onfulfill-code-string--void)
    - [`autoFocus?: boolean`](#autofocus-boolean)
    - [`codeLength?: number`](#codelength-number)
    - [`defaultCode?: string`](#defaultcode-string)
  - [Style props](#style-props)
    - [`maskSymbol:? string`](#masksymbol-string)
    - [`keyboardType:? KeyboardType`](#keyboardtype-keyboardtype)
    - [`activeColor?: string`](#activecolor-string)
    - [`inactiveColor?: string`](#inactivecolor-string)
    - [`cellBorderWidth?: number`](#cellborderwidth-number)
    - [`space?: number`](#space-number)
    - [`size?: number`](#size-number)
    - [`inputPosition?: 'left' | 'right' | 'center' | 'full-width'`](#inputposition-left--right--center--full-width)
    - [`variant?: 'border-box' | 'border-circle' | 'border-b' | 'clear'`](#variant-border-box--border-circle--border-b--clear)
  - [Customize props](#customize-props)
    - [`containerProps?: ViewProps`](#containerprops-viewprops)
    - [`inputProps?: TextInputProps`](#inputprops-textinputprops)
    - [`cellProps: TextProps | ({index: number, isFocused: boolean, hasValue: boolean}) => TextProps`](#cellprops-textprops--index-number-isfocused-boolean-hasvalue-boolean--textprops)
  - [Other props](#other-props)
    - [`testID?: any`](#testid-any)
  - [Functions](#functions)
    - [`focus() => void`](#focus--void)
    - [`blur() => void`](#blur--void)
    - [`clear = () => void`](#clear----void)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# API

## Base props

### `onFulfill: (code: string) => void`

Callback function called when fulfilling code.

**Required**

### `autoFocus?: boolean`

Auto focus on code input, Default `false`

### `codeLength?: number`

Length of confirmation code -> number of cells. Default `5`

### `defaultCode?: string`

Default code value, must be the same length as `codeLength`

## Style props

### `maskSymbol:? string`

A symbol that will be displayed when the field is filled. Supports emoji.

<img width="400" src="https://raw.githubusercontent.com/retyui/react-native-confirmation-code-field/master/docs/img/maskSymbol.jpg"/>

### `keyboardType:? KeyboardType`

Determines which keyboard to open.

[All values: KeyboardType](https://github.com/facebook/react-native/blob/386c2ec6f0f0a61cbd49865d8283f88e64185f34/Libraries/Components/TextInput/TextInput.js#L143-L159).

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

### `variant?: 'border-box' | 'border-circle' | 'border-b' | 'clear'`

Some built-in variants. Default `border-box`. [Demo `variant`:](examples/rn56/src/propsDemos/Variant.js)

<img width="400" src="https://raw.githubusercontent.com/retyui/react-native-confirmation-code-field/master/docs/img/variant.jpg"/>

## Customize props

### `containerProps?: ViewProps`

[`<View/>` component props](https://facebook.github.io/react-native/docs/view#props)

### `inputProps?: TextInputProps`

[`<TextInput/>` component props](https://facebook.github.io/react-native/docs/textinput#props)

### `cellProps: TextProps | ({index: number, isFocused: boolean, hasValue: boolean}) => TextProps`

That property help customize Cells. When pass Object it must be [`<Text/> component props`](https://facebook.github.io/react-native/docs/text#props) and this object will spread for each cell.

And if you pass function component will call with next options: 

- `index`: uniq number of cell
- `isFocused`: is cell in focus now
- `hasValue`: is cell has value

Component expects you will pass TextProps or null.

 ([Example](https://github.com/retyui/react-native-confirmation-code-field/blob/cf1dfab32f253312642d42eaffd586396c924435/examples/src/realDemo/DarkExample/index.js#L35-L45) for custom style)

## Other props

### `testID?: any`

Help in test

## Functions

### `focus() => void`

Method that will focus the TextInput programmatically.

### `blur() => void`

Method that will blur the TextInput programmatically.

### `clear = () => void`

Method to clear the entered code.

```js
import React, { Component, createRef } from 'react';
import CodeInput from 'react-native-confirmation-code-field';

class App extends Component {
  inputRef = createRef();

  handlerOnIvalidCode() {
    const { current } = this.inputRef;

    if (current) {
      current.clear();
    }
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
