/*

Concept: https://dribbble.com/shots/5476562-Forgot-Password-Verification/attachments

*/
import {Animated, Image, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from './styles';

const CELL_COUNT = 4;
const rootProps = {style: styles.codeFieldRoot};
const source = {
  uri: 'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
};

// Each cell owns its animated values and animates when its own state changes
const AnimatedCell = ({symbol, isFilled, isFocused, onLayout}) => {
  const focusAnimation = useRef(new Animated.Value(0)).current;
  const fillAnimation = useRef(new Animated.Value(1)).current;

  // Two separate effects: each animation only restarts when its own state changes
  useEffect(() => {
    Animated.timing(focusAnimation, {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }).start();
  }, [isFocused, focusAnimation]);

  useEffect(() => {
    Animated.spring(fillAnimation, {
      useNativeDriver: false,
      toValue: isFilled ? 0 : 1,
    }).start();
  }, [isFilled, fillAnimation]);

  const animatedCellStyle = {
    backgroundColor: isFilled
      ? fillAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
        })
      : focusAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
        }),
    borderRadius: fillAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
    }),
    transform: [
      {
        scale: fillAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.2, 1],
        }),
      },
    ],
  };

  return (
    <Animated.Text
      style={[styles.cell, animatedCellStyle]}
      onLayout={onLayout}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants">
      {symbol || (isFocused ? <Cursor /> : null)}
    </Animated.Text>
  );
};

const AnimatedExample = () => {
  const [value, setValue] = useState('');
  const {inputProps, getCellOnLayoutHandler} = useClearByFocusCell({
    value,
    setValue,
    cellCount: CELL_COUNT,
  });

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Verification</Text>
      <Image style={styles.icon} source={source} />
      <Text style={styles.subTitle}>
        Please enter the verification code{'\n'}
        we send to your email address
      </Text>

      <CodeField
        blurOnFulfill
        {...inputProps}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        RootProps={rootProps}
        textContentType="oneTimeCode"
        accessibilityLabel="Verification code"
        renderCell={({index, symbol, isFilled, isFocused}) => (
          <AnimatedCell
            key={index}
            symbol={symbol}
            isFilled={isFilled}
            isFocused={isFocused}
            onLayout={getCellOnLayoutHandler(index)}
          />
        )}
      />
      <View style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Verify</Text>
      </View>
    </SafeAreaView>
  );
};

export default AnimatedExample;
