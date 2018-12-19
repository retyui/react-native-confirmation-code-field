import React, { Component, createRef } from 'react';
import { Alert, Text, View } from 'react-native';
import LinearGradient from '../../LinearGradient';

import CodeFiled from 'react-native-confirmation-code-field';

import styles from './styles';

const horizontalGradient = {
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
};

const upToDownGradient = {
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
};

export default class DarkExample extends Component {
  onFinishCheckingCode = code => {
    if (code === '1234') {
      return Alert.alert('Confirmation Code', 'Successful!', [{ text: 'OK' }], {
        cancelable: false,
      });
    }

    Alert.alert('Confirmation Code', 'Code not match!', [{ text: 'OK' }], {
      cancelable: false,
    });

    // If code does not match, clear input with: this.refs.codeInputRef1.clear()
    this.codeInputRef.current.clear();
  };

  cellProps = ({ /*index, isFocused,*/ hasValue }) => {
    if (hasValue) {
      return {
        style: [styles.input, styles.inputNotEmpty],
      };
    }

    return {
      style: styles.input,
    };
  };
  static containerProps = { style: styles.inputWrapStyle };

  static buttonColors = ['#8096ee', '#a571ff'];

  static rootColors = ['#2f3d6c', '#161e3c'];

  codeInputRef = createRef();

  render() {
    /*concept : https://dribbble.com/shots/4766183-Code-Verification-UI-Design */
    return (
      <LinearGradient
        {...upToDownGradient}
        colors={DarkExample.rootColors}
        style={styles.linearGradient}
      >
        <View>
          <Text style={styles.inputLabel}>Confirmation</Text>
          <Text style={styles.inputSubLabel}>
            Please enter the code sent we sent to the number + 375 (25) xxxx xx
            13
          </Text>
          <CodeFiled
            ref={this.codeInputRef}
            inputPosition="full-width"
            variant="clear"
            codeLength={4}
            size={60}
            keyboardType="numeric"
            cellProps={this.cellProps}
            containerProps={DarkExample.containerProps}
            onFulfill={this.onFinishCheckingCode}
          />
          <Text style={styles.resetCode}>RESEND CODE</Text>
          <LinearGradient
            {...horizontalGradient}
            colors={DarkExample.buttonColors}
            style={styles.nextButton}
          >
            <Text style={styles.nextButtonText}>Confirm</Text>
          </LinearGradient>
        </View>
      </LinearGradient>
    );
  }
}
