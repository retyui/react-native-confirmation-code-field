import {TextInput} from 'react-native';

if (!new TextInput({})._onPress) {
  console.warn(
    '[react-native-confirmation-code-field]: This version React Native not support hack for TextInput!',
  );
}

class TextInputCustom extends TextInput {
  // This hack needs to get click position and then calculate what cell on clicked
  _onPress = event => {
    const {onPress, editable} = this.props;

    if (onPress && (editable || editable === undefined)) {
      onPress(event);
    }

    super._onPress(event);
  };
}

export default TextInputCustom;
