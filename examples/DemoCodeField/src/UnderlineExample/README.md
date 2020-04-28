# Underline example

![react-native-confirmation-code-field underline example](https://media.giphy.com/media/XEazF64IwELNV8wZge/giphy.gif)

React Native have issue with [border styles for `<Text/>` on iOS](https://github.com/facebook/react-native/issues/23537).

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
