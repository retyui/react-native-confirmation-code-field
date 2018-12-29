// @flow
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import Text from '../Text';
import Cursor from '../Cursor';
import TextInput from '../TextInput';
import createRef from '../../createRef';
import { concatStyles } from '../../styles';

import { getCellStyle, getContainerStyle, styles } from './styles';
import { validateCompareCode } from './validation';

import type { Props, State } from './types';
import type {
  LayoutEvent,
  PressEvent,
} from 'react-native/Libraries/Types/CoreEventTypes';

export default class ConfirmationCodeInput extends PureComponent<Props, State> {
  static propTypes = {
    activeColor: PropTypes.string,
    autoFocus: PropTypes.bool,
    cellBorderWidth: PropTypes.number,
    codeLength: PropTypes.number,
    containerProps: PropTypes.object,
    defaultCode: validateCompareCode,
    cellProps: PropTypes.func,
    inputProps: PropTypes.object,
    inactiveColor: PropTypes.string,
    inputPosition: PropTypes.oneOf(['center', 'left', 'right', 'full-width']),
    onChangeCode: PropTypes.func,
    onFulfill: PropTypes.func.isRequired,
    size: PropTypes.number,
    space: PropTypes.number,
    variant: PropTypes.oneOf([
      'border-box',
      'border-circle',
      'border-b',
      'clear',
    ]),
    keyboardType: TextInput.propTypes.keyboardType,
    maskSymbol: PropTypes.string,
  };

  static defaultProps = {
    cellProps: null,
    activeColor: '#fff',
    autoFocus: false,
    cellBorderWidth: 1,
    codeLength: 5,
    containerProps: {},
    defaultCode: '',
    inputProps: {},
    inputStyle: null,
    inactiveColor: '#ffffff40',
    inputPosition: 'center',
    onChangeCode: null,
    size: 40,
    space: 8,
    variant: 'border-box',
    keyboardType: 'default',
    maskSymbol: null,
  };

  input = createRef();

  state = {
    isFocused: false,
    codeValue: this.props.defaultCode
      ? this.truncateString(this.props.defaultCode)
      : '',
  };

  cellsLayouts: {
    [key: string]: {|
      x: number,
      y: number,
      xEnd: number,
      yEnd: number,
    |},
  } = {};

  clear() {
    this.handlerOnTextChange('');
  }

  handlerOnLayoutCell = (index: number, event: LayoutEvent) => {
    const { width, x, y, height } = event.nativeEvent.layout;

    this.cellsLayouts[`${index}`] = { x, xEnd: x + width, y, yEnd: y + height };
  };

  renderCode = (codeSymbol: string, index: number) => {
    const { cellProps, maskSymbol } = this.props;
    const isActive = this.getCurrentIndex() === index;

    let customProps = null;

    if (cellProps) {
      customProps = cellProps({
        index,
        isFocused: isActive,
        hasValue: Boolean(codeSymbol),
      });
    }

    return (
      <Text
        {...customProps}
        key={index}
        index={index}
        onLayout={this.handlerOnLayoutCell}
        style={concatStyles(
          getCellStyle(this.props, { isActive }),
          customProps && customProps.style,
        )}
      >
        {isActive
          ? this.renderCursor()
          : (codeSymbol && maskSymbol) || codeSymbol}
      </Text>
    );
  };

  renderCursor() {
    if (this.state.isFocused) {
      return <Cursor />;
    }

    return null;
  }

  renderCodeCells() {
    // $FlowFixMe
    return this.getCodeSymbols().map(this.renderCode);
  }

  inheritTextInputMethod(methodName: string, handler: Function) {
    return (e: mixed) => {
      handler(e);

      const { inputProps } = this.props;

      if (inputProps && inputProps[methodName]) {
        inputProps[methodName](e);
      }
    };
  }

  handlerOnTextChange = this.inheritTextInputMethod(
    'onTextChange',
    (text: string) => {
      const codeValue = this.truncateString(text);
      const { codeLength, onFulfill } = this.props;

      this.setState(
        {
          codeValue,
        },
        () => {
          if (this.getCodeLength() === codeLength) {
            this.blurInput();

            onFulfill(codeValue);
          }
        },
      );
    },
  );

  getCodeSymbols(): Array<string> {
    const { codeLength } = this.props;
    const { codeValue } = this.state;

    return codeValue
      .split('')
      .concat(new Array(codeLength).fill(''))
      .slice(0, codeLength);
  }

  blurInput() {
    const { current } = this.input;

    if (current) {
      current.blur();
    }
  }

  focusInput() {
    const { current } = this.input;

    if (current) {
      current.focus();
    }
  }

  getCurrentIndex() {
    return this.state.codeValue.length;
  }

  getCodeLength() {
    return this.truncateString(this.state.codeValue).length;
  }

  truncateString(str: string): string {
    return str.substr(0, this.props.codeLength);
  }

  findIndex(locationX: number, locationY: number): number {
    // $FlowFixMe
    for (const [index, { x, y, xEnd, yEnd }] of Object.entries(
      this.cellsLayouts,
    )) {
      if (
        x < locationX &&
        locationX < xEnd &&
        (y < locationY && locationY < yEnd)
      ) {
        return parseInt(index, 10);
      }
    }

    return -1;
  }

  handlerOnPress = ({ nativeEvent: { locationX, locationY } }: PressEvent) => {
    const index = this.findIndex(locationX, locationY);

    if (index !== -1) {
      this.handlerOnTextChange(this.state.codeValue.slice(0, index));
    }
  };

  handlerOnFocus = this.inheritTextInputMethod('onFocus', () =>
    this.setState({ isFocused: true }),
  );

  handlerOnBlur = this.inheritTextInputMethod('onBlur', () =>
    this.setState({ isFocused: false }),
  );

  renderInput() {
    const { inputProps, keyboardType } = this.props;

    return (
      <TextInput
        ref={this.input}
        keyboardType={keyboardType}
        {...inputProps}
        onBlur={this.handlerOnBlur}
        onFocus={this.handlerOnFocus}
        onPress={this.handlerOnPress}
        style={concatStyles(styles.maskInput, inputProps.style)}
        onChangeText={this.handlerOnTextChange}
      >
        {this.state.codeValue}
      </TextInput>
    );
  }

  render() {
    const { containerProps } = this.props;

    return (
      <View {...containerProps} style={getContainerStyle(this.props)}>
        {this.renderCodeCells()}
        {this.renderInput()}
      </View>
    );
  }
}
