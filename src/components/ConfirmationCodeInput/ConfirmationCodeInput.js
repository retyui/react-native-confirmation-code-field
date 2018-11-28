// @flow
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, TextInput as TextInputNative, StyleSheet } from 'react-native';

import TextInput from '../TextInput';
import { getClassStyle, getInputSpaceStyle } from '../../utils';
import { getContainerStyle, styles } from './styles';
import { validateCompareCode, validateInputProps } from './validation';

import type { Props, State, KeyPressEvent } from './types';
import type { VariantNames } from '../../types';

const getDefaultCodeSymbols: number => Array<string> = codeLength =>
  new Array(codeLength).fill('');

export default class ConfirmationCodeInput extends PureComponent<Props, State> {
  static propTypes = {
    activeColor: PropTypes.string,
    autoFocus: PropTypes.bool,
    cellBorderWidth: PropTypes.number,
    codeLength: PropTypes.number,
    containerProps: PropTypes.object,
    defaultCode: validateCompareCode,
    inputProps: PropTypes.func,
    inputStyle: PropTypes.func,
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
      'border-b-t',
      'border-l-r',
      'clear',
    ]),
    keyboardType: TextInputNative.propTypes.keyboardType,
    maskSymbol: PropTypes.string,
  };

  static defaultProps = {
    activeColor: '#fff',
    autoFocus: false,
    cellBorderWidth: 1,
    codeLength: 5,
    containerProps: {},
    defaultCode: null,
    inputProps: null,
    inputStyle: null,
    inactiveColor: '#ffffff40',
    inputPosition: 'center',
    onChangeCode: null,
    size: 40,
    space: 8,
    variant: 'border-box',
    keyboardType: 'default',
    maskSymbol: null,
    canPasteCode: false,
  };

  styles: Object;

  ignoreOnFocusHandler: boolean = false;

  constructor(...args: any) {
    super(...args);

    const { defaultCode, codeLength, size } = this.props;

    this.state = {
      codeSymbols:
        typeof defaultCode === 'string'
          ? defaultCode.split('')
          : getDefaultCodeSymbols(codeLength),
      currentIndex: 0,
    };

    this.styles = StyleSheet.create({
      input: {
        width: size,
        height: size,
      },
      container: { height: size },
    });
  }

  onChangeCb = () => {
    const { onChangeCode } = this.props;

    if (onChangeCode) {
      onChangeCode(this.state.codeSymbols.join(''));
    }
  };

  clear() {
    this.setState(
      {
        currentIndex: 0,
        codeSymbols: getDefaultCodeSymbols(this.props.codeLength),
      },
      () => {
        this.setFocus(0);
      },
    );
  }

  detectFirstFocus: boolean = false;

  handlerOnFocus = (index: number) => {
    if (this.ignoreOnFocusHandler) {
      return;
    }

    const newCodeArr = [...this.state.codeSymbols];
    const currentEmptyIndex = newCodeArr.findIndex(c => !c);

    if (currentEmptyIndex !== -1 && currentEmptyIndex < index) {
      return this.setFocus(currentEmptyIndex);
    }

    this.setState(
      {
        codeSymbols: newCodeArr.map((e, ind) => {
          if (ind >= index) {
            return '';
          }

          return e;
        }),
        currentIndex: index,
      },
      () => {
        if (this.detectFirstFocus) {
          this.onChangeCb();
        } else {
          this.detectFirstFocus = true;
        }
      },
    );
  };

  getClassStyle(variant: VariantNames, active: boolean) {
    const {
      activeColor,
      cellBorderWidth,
      inactiveColor,
      inputPosition,
      space,
    } = this.props;

    return getClassStyle(variant, active, {
      activeColor,
      cellBorderWidth,
      inactiveColor,
      inputSpaceStyle: getInputSpaceStyle(space, inputPosition),
    });
  }

  onKeyPress = (e: KeyPressEvent) => {
    if (e.nativeEvent.key !== 'Backspace') {
      return;
    }
    const { currentIndex } = this.state;
    const nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;

    this.setFocus(nextIndex);
  };

  isLastIndex(index: number): boolean {
    return index === this.props.codeLength - 1;
  }

  normalizeNewCode(array: Array<string>): Array<string> {
    const { codeLength } = this.props;

    const clearArray = array.filter(Boolean);

    // Slice code when user paste long text
    return new Array(codeLength).fill('').map((e, i) => {
      if (clearArray[i]) {
        return clearArray[i];
      }

      return e;
    });
  }

  getCurrentIndex(symbols: Array<string>): number {
    // Try holes in the array [1,2,3,'']
    const index = symbols.findIndex(symbol => !symbol);

    if (index === -1) {
      return this.props.codeLength - 1;
    }

    return index - 1;
  }

  handlerOnChangeText = (text: string, index: number) => {
    // Fix for react-native-web
    // Skip onChange when text deleted, onKeyPress must handled the behavior
    if (!text) {
      return;
    }

    const { codeSymbols } = this.state;

    if (!this.props.canPasteCode) {
      text = text[0];
    }

    const newCodeSymbols = this.normalizeNewCode([...codeSymbols, ...text.split()]);
    const currentIndex = this.getCurrentIndex(newCodeSymbols);

    this.setState({
      codeSymbols: newCodeSymbols,
      currentIndex: currentIndex + 1,
    });

    if (this.isLastIndex(currentIndex)) {
      const { onFulfill } = this.props;
      const code = newCodeSymbols.join('');

      this.blur(index);

      onFulfill(code);
    } else {
      // Skip processing onFocus that changes state
      this.ignoreOnFocusHandler = true;

      this.setFocus(currentIndex + 1);
    }
  };

  codeInputRefs: Array<{ blur: () => void, focus: () => void }> = [];

  setFocus(index: number) {
    this.codeInputRefs[index].focus();
    this.ignoreOnFocusHandler = false;
  }

  blur(index: number) {
    this.codeInputRefs[index].blur();
  }

  setInputRef = (ref: any, idx: number) => {
    this.codeInputRefs[idx] = ref;
  };

  getValue(value: string): string {
    const { maskSymbol } = this.props;

    return value ? maskSymbol || value.toString() : '';
  }

  renderInput(value: string, index: number) {
    const {
      inputStyle,
      autoFocus,
      variant,
      activeColor,
      inputProps,
      keyboardType,
    } = this.props;
    const { currentIndex } = this.state;

    const customInputProps = inputProps ? inputProps(index) : null;

    if (process.env.NODE_ENV !== 'production') {
      validateInputProps(customInputProps);
    }

    const finalValue = this.getValue(value);

    return (
      <TextInput
        key={index}
        id={index}
        forwardRef={this.setInputRef}
        underlineColorAndroid="transparent"
        keyboardType={keyboardType}
        returnKeyType="done"
        selectionColor={activeColor}
        autoFocus={autoFocus && index === 0}
        value={finalValue}
        {...customInputProps}
        style={[
          styles.codeInput,
          this.styles.input,
          this.getClassStyle(variant, currentIndex === index),
          customInputProps && customInputProps.style,
          typeof inputStyle === 'function'
            ? inputStyle(index, currentIndex === index, Boolean(value))
            : null,
        ]}
        maxLength={this.calculateMaxLength(finalValue)}
        onChangeText={this.handlerOnChangeText}
        onFocus={this.handlerOnFocus}
        onKeyPress={this.onKeyPress}
      />
    );
  }

  calculateMaxLength(value: string): number {
    if (this.props.canPasteCode) {
      return this.props.codeLength;
    }

    // Fix for emoji '👲'.length === 2
    return value ? value.length : 1;
  }

  render() {
    const { inputPosition, containerProps } = this.props;
    const { codeSymbols } = this.state;

    return (
      <View
        {...containerProps}
        style={[
          styles.container,
          getContainerStyle(inputPosition),
          this.styles.container,
          containerProps.style,
        ]}
      >
        {codeSymbols.map((value, id) => this.renderInput(value, id))}
      </View>
    );
  }
}
