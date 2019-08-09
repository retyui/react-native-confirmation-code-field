// @flow
import React, { PureComponent, createRef } from 'react';
import { View, TextInput as TextInputNative, Platform } from 'react-native';

import { concatStyles } from '../../styles';

import Cursor from '../Cursor';
import MaskSymbol from '../MaskSymbol';
import Cell from '../Cell';
import TextInputCustom from '../TextInputCustom';

import { getCellStyle, getContainerStyle, styles } from './styles';

import type { Props, State } from './types';
import type {
  LayoutEvent,
  PressEvent,
} from 'react-native/Libraries/Types/CoreEventTypes';

class ConfirmationCodeInput extends PureComponent<Props, State> {
  static defaultProps = {
    normalizeCode: (code: string): string => code,
    cellProps: null,
    activeColor: '#fff',
    autoFocus: false,
    cellBorderWidth: 1,
    codeLength: 5,
    containerProps: {},
    defaultCode: null,
    inputProps: {},
    inactiveColor: '#ffffff40',
    inputPosition: 'center',
    size: 40,
    space: 8,
    variant: 'border-box',
    keyboardType: 'number-pad',
    maskSymbol: '',
    CellComponent: Cell,
    blurOnSubmit: true,
  };

  _input = createRef();

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
    const { isFocused } = this.state;
    const { cellProps, CellComponent } = this.props;
    const isActive = this.getCurrentIndex() === index;

    let customProps = null;

    if (cellProps) {
      customProps =
        typeof cellProps === 'function'
          ? cellProps({
              index,
              isFocused: isActive && isFocused,
              hasValue: Boolean(codeSymbol),
            })
          : cellProps;
    }

    const customStyle = customProps && customProps.style;

    return (
      <CellComponent
        key={index}
        {...customProps}
        editable={false}
        // eslint-disable-next-line react/jsx-no-bind
        onLayout={event => this.handlerOnLayoutCell(index, event)}
        style={concatStyles(
          getCellStyle(this.props, { isActive }),
          customStyle,
        )}
      >
        {isActive ? this.renderCursor() : this.renderSymbol(codeSymbol, index)}
      </CellComponent>
    );
  };

  renderSymbol(symbol: string, index: number) {
    const { maskSymbol } = this.props;
    const lastIndex = this.getLastIndex();

    if (maskSymbol && symbol) {
      return (
        <MaskSymbol
          isLast={index === lastIndex}
          delay={500}
          mask={maskSymbol}
          symbol={symbol}
        />
      );
    }

    return symbol;
  }

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
      const { codeLength, onFulfill, blurOnSubmit } = this.props;

      this.setState(
        {
          codeValue,
        },
        () => {
          if (this.getCodeLength() === codeLength) {
            if (blurOnSubmit) {
              this.blur();
            }

            onFulfill(codeValue);
          }
        },
      );
    },
  );

  getLastIndex() {
    return Math.min(this.state.codeValue.length, this.props.codeLength) - 1;
  }

  getCodeSymbols(): Array<string> {
    const { codeLength } = this.props;
    const { codeValue } = this.state;

    return [...codeValue, ...new Array(codeLength).fill('')].slice(
      0,
      codeLength,
    );
  }

  blur() {
    const { current } = this._input;

    if (current) {
      current.blur();
    }
  }

  focus() {
    const { current } = this._input;

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
    const { codeLength, normalizeCode } = this.props;

    return normalizeCode(str.substr(0, codeLength));
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

  clearCodeByCoords(locationX: number, locationY: number) {
    const index = this.findIndex(locationX, locationY);

    if (index !== -1) {
      this.handlerOnTextChange(this.state.codeValue.slice(0, index));
    }
  }

  handlerOnPress = ({ nativeEvent: { locationX, locationY } }: PressEvent) => {
    this.clearCodeByCoords(locationX, locationY);
  };

  // For support react-native-web
  handlerOnClick = (e: any) => {
    const offset = e.target.getClientRects()[0];
    const locationX = e.clientX - offset.left;
    const locationY = e.clientY - offset.top;

    this.clearCodeByCoords(locationX, locationY);
  };

  handlerOnFocus = this.inheritTextInputMethod('onFocus', () =>
    this.setState({ isFocused: true }),
  );

  handlerOnBlur = this.inheritTextInputMethod('onBlur', () =>
    this.setState({ isFocused: false }),
  );

  renderInput() {
    const { autoFocus, inputProps, keyboardType, codeLength } = this.props;
    const handlers =
      Platform.OS === 'web'
        ? { onClick: this.handlerOnClick }
        : { onPress: this.handlerOnPress };

    return (
      // $FlowFixMe - onClick strange prop
      <TextInputCustom
        ref={this._input}
        maxLength={codeLength}
        {...inputProps}
        {...handlers}
        autoFocus={autoFocus}
        keyboardType={keyboardType}
        onBlur={this.handlerOnBlur}
        onFocus={this.handlerOnFocus}
        style={concatStyles(styles.maskInput, inputProps.style)}
        onChangeText={this.handlerOnTextChange}
        value={this.state.codeValue}
      />
    );
  }

  render() {
    const { containerProps, testID } = this.props;

    return (
      <View
        {...containerProps}
        testID={testID}
        style={getContainerStyle(this.props)}
      >
        {this.renderCodeCells()}
        {this.renderInput()}
      </View>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  const PropTypes = require('prop-types');
  const { validateCompareCode } = require('./validation');

  ConfirmationCodeInput.propTypes = {
    onFulfill: PropTypes.func.isRequired,

    normalizeCode: PropTypes.func,
    activeColor: PropTypes.string,
    autoFocus: PropTypes.bool,
    cellBorderWidth: PropTypes.number,
    codeLength: PropTypes.number,
    containerProps: PropTypes.object,
    defaultCode: validateCompareCode,
    cellProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    inputProps: PropTypes.object,
    inactiveColor: PropTypes.string,
    inputPosition: PropTypes.oneOf(['center', 'left', 'right', 'full-width']),
    size: PropTypes.number,
    space: PropTypes.number,
    variant: PropTypes.oneOf([
      'border-box',
      'border-circle',
      'border-b',
      'clear',
    ]),
    keyboardType: TextInputNative.propTypes.keyboardType,
    maskSymbol: PropTypes.string,
    blurOnSubmit: PropTypes.bool,
  };
}

export default ConfirmationCodeInput;
