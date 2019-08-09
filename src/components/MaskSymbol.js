// @flow
import React, { Component } from 'react';
import { Text } from 'react-native';

type Props = {|
  delay: number,
  mask: string,
  symbol: string,
  isLast: boolean,
|};

type State = {|
  showSymbol: boolean,
|};

class MaskSymbol extends Component<Props, State> {
  timeout: TimeoutID;

  state = {
    showSymbol: true,
  };

  static getDerivedStateFromProps(props: Props) {
    if (!props.isLast) {
      return { showSymbol: false };
    }

    return null;
  }

  componentDidMount() {
    this.timeout = setTimeout(
      () => this.setState({ showSymbol: false }),
      this.props.delay,
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { mask, symbol } = this.props;
    const { showSymbol } = this.state;

    return <Text>{showSymbol ? symbol : mask}</Text>;
  }
}

export default MaskSymbol;
