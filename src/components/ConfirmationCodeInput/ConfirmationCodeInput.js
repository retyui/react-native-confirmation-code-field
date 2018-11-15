// @flow
import React, { PureComponent } from 'react';
import { View, TextInput as TextInputNative, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { getClassStyle, getInputSpaceStyle, isMatchingCode } from '../../utils';
import TextInput from '../TextInput';
import { getContainerStyle, styles } from './styles';
import { validateCompareCode, validateInputProps } from './validation';

import type { SyntheticEvent } from 'react-native/Libraries/Types/CoreEventTypes';
import type { VariantNames, INDEX } from '../../types';
import type { Props, State } from './types';

// eslint-disable-next-line
type DP = typeof ConfirmationCodeInput.defaultProps;

const getDefaultCodeSymbols: number => Array<string> = codeLength =>
  new Array(codeLength).fill('');

export default class ConfirmationCodeInput extends PureComponent<
  $Diff<Props, DP> & $Shape<DP>,
  State,
> {
  styles: Object;

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

  handlerOnFocus = (index: INDEX) => {
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

  static IOS_MINIMAL_DELAY = 20;

  lastKeyEventTimestamp: number = 0;

  onKeyPress = (e: SyntheticEvent<*>) => {
    if (e.nativeEvent.key === 'Backspace') {
      /**
       * Due to a bug in RN iOS TextInput implementation, an unwanted backspace
       * event is fired on key press after clearing out the text input.
       * Typically this backspace event follows the actual event
       * and the time duration is under 10ms.
       * Added a check to see if we receive a backspace event under ~20ms
       * after the last key press event. If found, do nothing.
       *
       * Bug link: https://github.com/facebook/react-native/issues/18374
       */
      if (
        Math.abs(this.lastKeyEventTimestamp - e.timeStamp) <
        ConfirmationCodeInput.IOS_MINIMAL_DELAY
      ) {
        return;
      }

      const { currentIndex } = this.state;
      const nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;

      this.setFocus(nextIndex);
    } else {
      // Record non-backspace key event time stamp
      this.lastKeyEventTimestamp = e.timeStamp;
    }
  };

  isLastIndex(index: INDEX): boolean {
    return index === this.props.codeLength - 1;
  }

  onInputCode = (character: string, index: INDEX) => {
    // on Android: text code is filled very slowly
    let requestFocus = false;
    if (!this.isLastIndex(index)) {
      requestFocus = true;
    }

    const {
      onFulfill,
      compareWithCode,
      ignoreCaseWhenCompareCode,
    } = this.props;
    const { currentIndex, codeSymbols } = this.state;
    const newCodeSymbols = [...codeSymbols];

    newCodeSymbols[index] = character;

    if (this.isLastIndex(index)) {
      const code = newCodeSymbols.join('');

      if (compareWithCode) {
        const isMatching = isMatchingCode(
          code,
          compareWithCode,
          ignoreCaseWhenCompareCode,
        );

        onFulfill(code, isMatching);

        if (isMatching) {
          this.clear();
        }
      } else {
        onFulfill(code);
      }

      this.blur(currentIndex);
    }

    this.setState(prevState => ({
      codeSymbols: newCodeSymbols,
      currentIndex: prevState.currentIndex + 1,
    }), () => {
      if(requestFocus) {
        this.setFocus(this.state.currentIndex));
      }
    }
  };

  codeInputRefs: Array<{ blur: () => void, focus: () => void }> = [];

  setFocus(index: INDEX) {
    this.codeInputRefs[index].focus();
  }

  blur(index: INDEX) {
    this.codeInputRefs[index].blur();
  }

  setInputRef = (ref: any, idx: INDEX) => {
    this.codeInputRefs[idx] = ref;
  };

  getValue(value: string): string {
    const { maskSymbol } = this.props;

    return value ? maskSymbol || value.toString() : '';
  }

  renderInput(value: string, index: INDEX) {
    const {
      getInputStyle,
      autoFocus,
      variant,
      activeColor,
      getInputProps,
      keyboardType,
    } = this.props;
    const { currentIndex } = this.state;

    const customInputProps = getInputProps ? getInputProps(index) : null;

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
          getInputStyle
            ? getInputStyle(index, currentIndex === index, Boolean(value))
            : null,
        ]}
        // fix for emoji  '😂'.length // 2
        maxLength={finalValue ? finalValue.length : 1}
        onChangeText={this.onInputCode}
        onFocus={this.handlerOnFocus}
        onKeyPress={this.onKeyPress}
      />
    );
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

  static propTypes = {
    activeColor: PropTypes.string,
    autoFocus: PropTypes.bool,
    cellBorderWidth: PropTypes.number,
    codeLength: PropTypes.number,
    compareWithCode: validateCompareCode,
    containerProps: PropTypes.object,
    defaultCode: validateCompareCode,
    getInputProps: PropTypes.func,
    ignoreCaseWhenCompareCode: PropTypes.bool,
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
    compareWithCode: null,
    containerProps: {},
    defaultCode: null,
    getInputProps: null,
    ignoreCaseWhenCompareCode: false,
    inactiveColor: '#ffffff40',
    inputPosition: 'center',
    onChangeCode: null,
    size: 40,
    space: 8,
    variant: 'border-box',
    keyboardType: 'default',
    maskSymbol: null,
  };
}
