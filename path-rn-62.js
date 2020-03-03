const {writeFileSync, readFileSync} = require('fs');

// TODO https://github.com/facebook/react-native/pull/28224
try {
  const textInputPath = require.resolve(
    'react-native/Libraries/Components/TextInput/TextInput.js',
  );
  const text = readFileSync(textInputPath).toString();
  const PATTERN = 'onPress={_onPress}';
  const PATH_ON_PRESS =
    'onPress={e => {_onPress(e);if (props.onPress) {props.onPress(e);}}}';

  if (text.includes(PATTERN)) {
    writeFileSync(textInputPath, text.replace(PATTERN, PATH_ON_PRESS));
  }
} catch (error) {}
