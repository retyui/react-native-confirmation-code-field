// @flow
import type { LayoutEvent } from 'react-native/Libraries/Types/CoreEventTypes';
import React, { Component, type ElementConfig } from 'react';
import { TextInput } from 'react-native';

import { omit } from '../omit';

type TextProps = ElementConfig<typeof TextInput>;
type TextPropsWithoutOnLayout = $Diff<TextProps, { onLayout: any }>;

type Props = $ReadOnly<{|
  ...$Exact<TextPropsWithoutOnLayout>,
  onLayout?: (index: number, event: LayoutEvent) => void,
  index: number,
|}>;

class Cell extends Component<Props> {
  handlerOnLayout = (event: LayoutEvent) => {
    const { onLayout, index } = this.props;

    if (onLayout) {
      onLayout(index, event);
    }
  };

  render() {
    return (
      <TextInput
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
