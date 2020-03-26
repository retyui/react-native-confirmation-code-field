import { View } from 'react-native';
import React, { forwardRef } from 'react';
import { getStyle, getSymbols } from './utils';
import TextInputCustom from './TextInputCustom';
import useFocusState from './useFocusState';
import styles from './CodeField.styles';
const DEFAULT_CELL_COUNT = 4;
const CodeField = ({ rootStyle, textInputStyle, onBlur, onFocus, value, renderCell, cellCount = DEFAULT_CELL_COUNT, RootProps = {}, RootComponent = View, ...rest }, ref) => {
    const [isFocused, handleOnBlur, handleOnFocus] = useFocusState({
        onBlur,
        onFocus,
    });
    const cells = getSymbols(value || '', cellCount).map((symbol, index, symbols) => {
        const isFirstEmptySymbol = symbols.indexOf('') === index;
        return renderCell({
            index,
            symbol,
            isFocused: isFocused && isFirstEmptySymbol,
        });
    });
    return (<RootComponent {...RootProps} style={getStyle(styles.root, rootStyle)}>
      {cells}
      <TextInputCustom caretHidden disableFullscreenUI spellCheck={false} autoCorrect={false} blurOnSubmit={false} clearButtonMode='never' autoCapitalize='characters' underlineColorAndroid='transparent' maxLength={cellCount} {...rest} value={value} onBlur={handleOnBlur} onFocus={handleOnFocus} style={getStyle(styles.textInput, textInputStyle)} ref={ref}/>
    </RootComponent>);
};
export default forwardRef(CodeField);
