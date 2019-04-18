// @flow
import React, { type ElementConfig } from 'react';
import { Platform, Text, TextInput } from 'react-native';

type TextProps = ElementConfig<typeof Text>;

// TODO: use Text component for all platform (via: https://github.com/facebook/react-native/issues/23537)
const CellComponent = Platform.OS === 'web' ? Text : TextInput;

// $FlowFixMe
const Cell = (props: TextProps) => <CellComponent {...props} />;

export default Cell;
