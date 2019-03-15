// @flow
import type { ElementConfig, Component } from 'react';
import type { PressEvent } from 'react-native/Libraries/Types/CoreEventTypes';
import { TextInput } from 'react-native';

// $FlowFixMe
if (!new TextInput()._onPress) {
  // eslint-disable-next-line no-console
  console.warn(
    '[react-native-confirmation-code-field]: This version React Native not support hack for TextInput!',
  );
}

export type TextInputCustomProps = $ReadOnly<{|
  ...$Exact<ElementConfig<typeof TextInput>>,
  onPress?: PressEvent => void,
|}>;

const TextInputCustom: Class<
  Component<TextInputCustomProps>,
  // $FlowFixMe
> = class extends TextInput {
  // This hack needs to get click position
  // and then calculate what cell on clicked
  _onPress = event => {
    // $FlowFixMe
    const { onPress, editable } = this.props;

    if (onPress && (editable || editable === undefined)) {
      onPress(event);
    }

    super._onPress(event);
  };
};

if (process.env.NODE_ENV !== 'production') {
  const PropTypes = require('prop-types');

  TextInputCustom.propTypes = {
    ...TextInput.propTypes,
    onPress: PropTypes.func,
  };
}

export default TextInputCustom;
