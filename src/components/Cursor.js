// @flow
import React, { Component } from 'react';
import { Text } from 'react-native';

export const CURSOR_BLINKING_ANIMATION_SPEED = 500;
export const CURSOR_SYMBOL = '|';

const style = {
  // reset inherit value
  backgroundColor: '#00000000',
};

export default class Cursor extends Component<
  {||},
  {| cursorSymbol: string |},
> {
  timeout: IntervalID;

  state = {
    cursorSymbol: CURSOR_SYMBOL,
  };

  componentDidMount() {
    // Simulate cursor blink animation
    this.timeout = setInterval(
      () =>
        this.setState(({ cursorSymbol }) => ({
          cursorSymbol: cursorSymbol ? '' : CURSOR_SYMBOL,
        })),
      CURSOR_BLINKING_ANIMATION_SPEED,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  render() {
    return <Text style={style}>{this.state.cursorSymbol}</Text>;
  }
}
