<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [API documentation react-native-confirmation-code-field](#api-documentation-react-native-confirmation-code-field)
  - [Components](#components)
    - [`<CodeField />`](#codefield-)
      - [`cellCount?: number`](#cellcount-number)
      - [`renderCell: (options: {symbol: string, index: number, isFocused: boolean}) => ReactElement`](#rendercell-options-symbol-string-index-number-isfocused-boolean--reactelement)
      - [`RootComponent?: ComponentType<any>`](#rootcomponent-componenttypeany)
      - [`rootStyle?: StyleProp<RootComponent>`](#rootstyle-styleproprootcomponent)
      - [`RootProps?: Object`](#rootprops-object)
      - [`textInputStyle?: StyleProp<TextStyle>`](#textinputstyle-styleproptextstyle)
    - [`<Cursor/>`](#cursor)
  - [Hooks](#hooks)
    - [`useClearByFocusCell({value?: string, setValue: (text: string) => void})`](#useclearbyfocuscellvalue-string-setvalue-text-string--void)
    - [`useBlurOnFulfill({value?: string, cellCount: number}): Ref<TextInput>`](#usebluronfulfillvalue-string-cellcount-number-reftextinput)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# API documentation react-native-confirmation-code-field

## Components

### `<CodeField />`

This a base component that render `RootComponent (default: View)` with cells that would be returned by `renderCell()` and a `<TextInput/>` that will be invisible and over all cells within root component

JSX tree will be next:

```js
<RootComponent style={rootStyle} {...RootProps}>
    {renderCell({index: 0,...})}
    {renderCell({index: 1,...})}
    // ...
    <TextInput style={[{opacity: 0},textInputStyle]} />
</RootComponent>
```

Inherits [TextInput Props](https://facebook.github.io/react-native/docs/textinput#props), (except `style`, use `rootStyle` for applying styles)

#### `cellCount?: number`

Number of characters in input (optional, default: 4)

#### `renderCell: (options: {symbol: string, index: number, isFocused: boolean}) => ReactElement`

Required function for Cell rendering, will be invoke with next options:

- `symbol: string`
- `index: number`
- `isFocused: boolean`

#### `RootComponent?: ComponentType<any>`

If you want change root component for example using animations `RootComponent={Animated.View}` (optional, default [`View`](https://facebook.github.io/react-native/docs/view))

#### `rootStyle?: StyleProp<RootComponent>`

Styles for root component (optional)

#### `RootProps?: Object`

Any props that will applied for root component `<RootComponent style={rootStyle} {...RootProps} />`

#### `textInputStyle?: StyleProp<TextStyle>`

Styles for invisible `<TextInput/>`, can be used for testing or debug (optional)

---

### `<Cursor/>`

It's a help component for simulation a cursor blinking animation in `<Cell/>` components

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

## Hooks

### `useClearByFocusCell({value?: string, setValue: (text: string) => void})`

Simple hook that add functionality that trim value by pressed cell

After invoke this hook wil return array with two values `[props,getCellOnLayout]`;

- `props` - an object that you should spreed to `<CodeField/>`
- `getCellOnLayout(index: number): Function` - helper method that returns `onLayout` handler

⚠️ ⚠️ ⚠️ If you need to style only one borderX (example `borderBottom`) you need to know about React Native issue with [border styles for `<Text/>` on iOS](https://github.com/facebook/react-native/issues/23537).

To fix it need `<View/>` wrapper for Cell, but don't forger to move `onLayout={getCellOnLayoutHandler(index)` to `<View/>`:

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

const App = () => {
  const [codeFieldProps, getCellOnLayout] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <CodeField
      {...codeFieldProps}
      value={value}
      onChangeText={setValue}
      renderCell={({index, symbol, isFocused}) => (
        <Text
          key={index}
          // Call getter method on each cell component
          onLayout={getCellOnLayout(index)}>
          {symbol}
        </Text>
      )}
    />
  );
};
```

### `useBlurOnFulfill({value?: string, cellCount: number}): Ref<TextInput>`

This hook include a logic to blurring `<TextInput/>` when value fulfilled

You should pass two params:

- `value?: string` - a string value that
- `cellCount: number`

Returned value will be a TextInput ref that you should pass to `<CodeField/>` component.

And when a value length would equal cellCount will be called `.blur()` method.

It work perfectly with `useClearByFocusCell` hook.

```js
import {
  CodeField,
  useBlurOnFulfill,
} from 'react-native-confirmation-code-field';

const App = () => {
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});

  return (
    <CodeField
      ref={ref}
      value={value}
      cellCount={CELL_COUNT}
      //...
    />
  );
};
```
