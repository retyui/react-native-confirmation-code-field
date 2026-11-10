<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [API documentation react-native-confirmation-code-field](#api-documentation-react-native-confirmation-code-field)
  - [Components](#components)
    - [`<CodeField />`](#codefield-)
      - [`cellCount?: number`](#cellcount-number)
      - [`renderCell: (options: RenderCellOptions) => ReactNode`](#rendercell-options-rendercelloptions--reactnode)
      - [`normalize?: (text: string) => string`](#normalize-text-string--string)
      - [`onFulfill?: (code: string) => void`](#onfulfill-code-string--void)
      - [`blurOnFulfill?: boolean`](#bluronfulfill-boolean)
      - [`RootComponent?: ComponentType<any>`](#rootcomponent-componenttypeany)
      - [`RootProps?: ViewProps`](#rootprops-viewprops)
      - [`InputComponent?: ComponentType<any>`](#inputcomponent-componenttypeany)
      - [`textInputStyle?: StyleProp<TextStyle>`](#textinputstyle-styleproptextstyle)
    - [`<Cursor/>`](#cursor)
    - [`<MaskSymbol/>`](#masksymbol)
  - [Hooks](#hooks)
    - [`useClearByFocusCell({value?: string, setValue: (text: string) => void, cellCount: number})`](#useclearbyfocuscellvalue-string-setvalue-text-string--void-cellcount-number)
  - [Accessibility](#accessibility)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# API documentation react-native-confirmation-code-field

## Components

### `<CodeField />`

This a base component that render `RootComponent (default: View)` with cells that would be returned by `renderCell()` and a `<TextInput/>` that will be invisible and over all cells within root component

JSX tree will be next:

```js
<RootComponent {...RootProps} style={[{flexDirection: 'row'}, RootProps.style]}>
    {renderCell({index: 0,...})}
    {renderCell({index: 1,...})}
    // ...
    <TextInput style={[{opacity: 0},textInputStyle]} />
</RootComponent>
```

Inherits [TextInput Props](https://reactnative.dev/docs/textinput#props), except `style` (use `RootProps.style` to style the root and `textInputStyle` for the invisible input).

Defaults applied to the input (you can override any of them): `keyboardType="number-pad"`, `autoComplete="one-time-code"` (`"sms-otp"` on Android), `submitBehavior="submit"`, `caretHidden`, `autoCorrect={false}`, `spellCheck={false}`.

#### `cellCount?: number`

Number of characters in input (optional, default: 4)

#### `renderCell: (options: RenderCellOptions) => ReactNode`

Required function for Cell rendering, will be invoked for each cell with next options:

- `symbol: string` - the character in this cell, or `''`
- `index: number`
- `isFocused: boolean` - the input is focused and this is the cell the next character goes into
- `isFieldFocused: boolean` - the input is focused (true for every cell, also when the code is complete)
- `isFilled: boolean` - the cell has a character
- `isPrevFilled: boolean` - the cell before the last filled one; pass it to `<MaskSymbol masked/>` to hide the previous character as soon as a new one is typed
- `isLast: boolean` - the last cell

```js
// Highlight the last cell while the full code is still focused
renderCell={({index, symbol, isFocused, isFieldFocused, isFilled, isLast}) => (
  <Text
    key={index}
    style={[styles.cell, (isFocused || (isFieldFocused && isFilled && isLast)) && styles.focusCell]}>
    {symbol || (isFocused ? <Cursor /> : null)}
  </Text>
)}
```

#### `normalize?: (text: string) => string`

Cleans up typed, pasted or autofilled text before `onChangeText` is called. The result is always cut to `cellCount` characters (optional, default: removes whitespace and dashes, so `"123 456"` and `"123-456"` become `"123456"`)

```js
// Letters and digits only, upper case
<CodeField normalize={(text) => text.replace(/[^a-z0-9]/gi, '').toUpperCase()} />
```

#### `onFulfill?: (code: string) => void`

Called when a change fills every cell (optional)

#### `blurOnFulfill?: boolean`

Blur the input when a change fills every cell (optional, default: `false`)

#### `RootComponent?: ComponentType<any>`

If you want change root component for example using animations `RootComponent={Animated.View}` (optional, default [`View`](https://reactnative.dev/docs/view))

#### `RootProps?: ViewProps`

Any props that will applied for root component, `RootProps.style` is merged with the default root style (optional)

#### `InputComponent?: ComponentType<any>`

If you want to provide a custom TextInput component that can receive the same props (optional, default [`TextInput`](https://reactnative.dev/docs/textinput)). Its props and `ref` type are used for `<CodeField/>` props.

#### `textInputStyle?: StyleProp<TextStyle>`

Styles for invisible `<TextInput/>`, can be used for testing or debug (optional)

---

### `<Cursor/>`

It's a help component for simulation a cursor blinking animation in `<Cell/>` components. Render it inside a `<Text/>`.

```js
import {Cursor} from 'react-native-confirmation-code-field';

<Cursor
  // Blinking animation speed (optional, number)
  delay={500}
  // Symbol that would be returned to simulate cursor blinking (optional, string)
  cursorSymbol="|"
/>;
```

---

### `<MaskSymbol/>`

Shows the character for `delay` ms and then the `maskSymbol`. Render it inside a `<Text/>`.

```js
import {MaskSymbol} from 'react-native-confirmation-code-field';

renderCell={({index, symbol, isFocused, isPrevFilled}) => (
  <Text key={index}>
    {symbol ? (
      <MaskSymbol
        // What to show instead of the character (required)
        maskSymbol="•"
        // Mask right away: the user already typed the next character (optional, boolean)
        masked={isPrevFilled}
        // How long the character stays visible (optional, number)
        delay={500}>
        {symbol}
      </MaskSymbol>
    ) : isFocused ? (
      <Cursor />
    ) : null}
  </Text>
)}
```

---

## Hooks

### `useClearByFocusCell({value?: string, setValue: (text: string) => void, cellCount: number})`

Simple hook that add functionality that trim value by pressed cell. A press in a gap between cells goes to the nearest cell.

It returns an object `{inputProps, getCellOnLayoutHandler}`:

- `inputProps` - an object that you should spread to `<CodeField/>`
- `getCellOnLayoutHandler(index: number): Function` - helper method that returns `onLayout` handler

⚠️ The `onLayout` handler must be on the element that `renderCell` returns (a direct child of the root), because positions are measured relative to the root.

⚠️ If you need to style only one borderX (example `borderBottom`) you need to know about React Native issue with [border styles for `<Text/>` on iOS](https://github.com/facebook/react-native/issues/23537).

To fix it need `<View/>` wrapper for Cell, but don't forget to move `onLayout={getCellOnLayoutHandler(index)}` to `<View/>`:

```js
// BAD 👎
renderCell={({index, symbol, isFocused}) => (
  <View key={index}>
    <Text
      onLayout={getCellOnLayoutHandler(index)}
    >
      {...}
    </Text>
  </View>
)}


// GOOD ✔️
renderCell={({index, symbol, isFocused}) => (
  <View
    key={index}
    onLayout={getCellOnLayoutHandler(index)}
  >
    <Text>{...}</Text>
  </View>
)}
```

**Example:**

```js
import {
  CodeField,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 4;

const App = () => {
  const [value, setValue] = useState('');
  const {inputProps, getCellOnLayoutHandler} = useClearByFocusCell({
    value,
    setValue,
    cellCount: CELL_COUNT,
  });

  return (
    <CodeField
      {...inputProps}
      value={value}
      onChangeText={setValue}
      cellCount={CELL_COUNT}
      renderCell={({index, symbol}) => (
        <Text
          key={index}
          // Call getter method on each cell component
          onLayout={getCellOnLayoutHandler(index)}>
          {symbol}
        </Text>
      )}
    />
  );
};
```

## Accessibility

The cells are only a picture of the input's value; screen readers should focus the invisible `<TextInput/>`. Give the input a label and hide the cells:

```js
<CodeField
  accessibilityLabel="Verification code"
  renderCell={({index, symbol}) => (
    <Text
      key={index}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants">
      {symbol}
    </Text>
  )}
/>
```
