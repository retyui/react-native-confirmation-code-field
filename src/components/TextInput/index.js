// @flow
import { TextInput } from 'react-native';

// $FlowFixMe
if (!new TextInput()._onPress) {
  // eslint-disable-next-line no-console
  console.warn(
    '[react-native-confirmation-code-field]: This version React Native not support hack for TextInput!',
  );
}

class TextInputCustom extends TextInput {
  // This hack needs to get click position
  // and then calculate what cell on clicked
  _onPress = event => {
    // $FlowFixMe
    const { onPress } = this.props;

    if (onPress) {
      onPress(event);
    }

    // $FlowFixMe
    super._onPress(event);
  };
}

export default TextInputCustom;
