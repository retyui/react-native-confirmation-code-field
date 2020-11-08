const {writeFileSync, readFileSync} = require('fs');

// TODO https://github.com/facebook/react-native/pull/28224
try {
  const textInputPath = require.resolve(
    'react-native/Libraries/Components/TextInput/TextInput.js',
  );
  const text = readFileSync(textInputPath).toString();

  const PATTERN_0_62x = 'onPress={_onPress}';
  const PATH_ON_PRESS_0_62x =
    'onPress={e => {_onPress(e);if (props.onPress) {props.onPress(e);}}}';

  if (text.includes(PATTERN_0_62x)) {
    return writeFileSync(
      textInputPath,
      text.replace(PATTERN_0_62x, PATH_ON_PRESS_0_62x),
    );
  }

  const PATTERN_0_61x = /onPress={this\._onPress}/g;
  const PATH_ON_PRESS_0_61x =
    'onPress={e => {this._onPress(e);if (this.props.onPress) {this.props.onPress(e);}}}';

  if (PATTERN_0_61x.test(text)) {
    return writeFileSync(
      textInputPath,
      text.replace(PATTERN_0_61x, PATH_ON_PRESS_0_61x),
    );
  }
} catch (error) {}
