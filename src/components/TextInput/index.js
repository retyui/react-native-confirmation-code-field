// @flow
import { TextInput } from 'react-native';

// $FlowFixMe
if (!TextInput._onPress) {
  throw new Error('This version React Native not support hack for TextInput!');
}

class TextInputCustom extends TextInput {
  _onPress = event => {
    // $FlowFixMe
    const { onPress, editable } = this.props;

    if (onPress) {
      onPress(event);
    }

    if (editable || editable === undefined) {
      this.focus();
    }
  };
}

export default TextInputCustom;
