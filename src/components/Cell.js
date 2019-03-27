// @flow
import type { LayoutEvent } from 'react-native/Libraries/Types/CoreEventTypes';
import React, { Component, type ElementConfig } from 'react';
import { TextInput, Text, Platform } from 'react-native';

import { omit } from '../omit';

type TextProps = ElementConfig<typeof TextInput>;
type TextPropsWithoutOnLayout = $Diff<TextProps, { onLayout: any }>;

type Props = $ReadOnly<{|
  ...$Exact<TextPropsWithoutOnLayout>,
  onLayout?: (index: number, event: LayoutEvent) => void,
  index: number,
|}>;

const CellComponent = Platform.OS === 'web' ? Text : TextInput;

class Cell extends Component<Props> {
  handlerOnLayout = (event: LayoutEvent) => {
    const { onLayout, index } = this.props;

    if (onLayout) {
      onLayout(index, event);
    }
  };

  render() {
    // TODO: replace to Text component (via: https://github.com/facebook/react-native/issues/23537)
    return (
      <CellComponent
        onLayout={this.handlerOnLayout}
        {...omit(['onLayout', 'index'], this.props)}
      />
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  const PropTypes = require('prop-types');

  Cell.propTypes = {
    ...TextInput.propTypes,
    index: PropTypes.number.isRequired,
  };
}

export default Cell;
