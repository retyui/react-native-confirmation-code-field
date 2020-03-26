declare const codeFieldStyles: {
    root: {
        justifyContent: "space-between";
        flexDirection: "row-reverse" | "row";
    };
    textInput: {
        opacity: number;
        fontSize: number;
        position: "absolute";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    } | {
        width: string;
        fontSize: number;
        opacity: number;
        position: "absolute";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    };
};
export default codeFieldStyles;
