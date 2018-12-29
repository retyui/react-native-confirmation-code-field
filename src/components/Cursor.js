// @flow
import React, { Component } from 'react';
import { Text } from 'react-native';

const CURSOR_BLINKING_ANIMATION_SPEED = 500;
const CURSOR_SYMBOL = '|';

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
    return <Text>{this.state.cursorSymbol}</Text>;
  }
}
