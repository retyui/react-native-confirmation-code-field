import { Platform, StyleSheet, I18nManager } from 'react-native';
const codeFieldStyles = StyleSheet.create({
    root: {
        justifyContent: 'space-between',
        // https://github.com/retyui/react-native-confirmation-code-field/pull/55
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    },
    textInput: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.01,
        fontSize: 1,
        ...Platform.select({
            web: {
                width: '100%',
                // Fix iOS aggressive zoom
                fontSize: 16,
            },
        }),
    },
});
export default codeFieldStyles;
