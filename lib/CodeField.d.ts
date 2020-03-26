import { StyleProp, TextInput, TextInputProps, TextStyle } from 'react-native';
import React from 'react';
declare const _default: React.ForwardRefExoticComponent<{
    rootStyle?: any;
    textInputStyle?: StyleProp<TextStyle>;
    RootProps?: {} | undefined;
    RootComponent?: React.ComponentClass<any, any> | React.FunctionComponent<any> | undefined;
    cellCount?: number | undefined;
    renderCell: (options: {
        symbol: string;
        index: number;
        isFocused: boolean;
    }) => React.ReactElement<any, any>;
} & Pick<TextInputProps, "value" | "allowFontScaling" | "autoCapitalize" | "autoCorrect" | "autoFocus" | "blurOnSubmit" | "caretHidden" | "contextMenuHidden" | "defaultValue" | "editable" | "keyboardType" | "maxLength" | "multiline" | "onBlur" | "onChange" | "onChangeText" | "onContentSizeChange" | "onEndEditing" | "onFocus" | "onSelectionChange" | "onSubmitEditing" | "onScroll" | "onKeyPress" | "placeholder" | "placeholderTextColor" | "returnKeyType" | "secureTextEntry" | "selectTextOnFocus" | "selection" | "selectionColor" | "testID" | "inputAccessoryViewID" | "maxFontSizeMultiplier" | "hitSlop" | "onLayout" | "pointerEvents" | "removeClippedSubviews" | "nativeID" | "collapsable" | "needsOffscreenAlphaCompositing" | "renderToHardwareTextureAndroid" | "shouldRasterizeIOS" | "isTVSelectable" | "hasTVPreferredFocus" | "tvParallaxProperties" | "tvParallaxShiftDistanceX" | "tvParallaxShiftDistanceY" | "tvParallaxTiltAngle" | "tvParallaxMagnification" | "onStartShouldSetResponder" | "onMoveShouldSetResponder" | "onResponderEnd" | "onResponderGrant" | "onResponderReject" | "onResponderMove" | "onResponderRelease" | "onResponderStart" | "onResponderTerminationRequest" | "onResponderTerminate" | "onStartShouldSetResponderCapture" | "onMoveShouldSetResponderCapture" | "onTouchStart" | "onTouchMove" | "onTouchEnd" | "onTouchCancel" | "onTouchEndCapture" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityStates" | "accessibilityState" | "accessibilityHint" | "onAccessibilityAction" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "clearButtonMode" | "clearTextOnFocus" | "dataDetectorTypes" | "enablesReturnKeyAutomatically" | "keyboardAppearance" | "passwordRules" | "rejectResponderTermination" | "selectionState" | "spellCheck" | "textContentType" | "scrollEnabled" | "autoCompleteType" | "importantForAutofill" | "disableFullscreenUI" | "inlineImageLeft" | "inlineImagePadding" | "numberOfLines" | "returnKeyLabel" | "textBreakStrategy" | "underlineColorAndroid" | "textAlignVertical"> & React.RefAttributes<TextInput>>;
export default _default;
