export declare const DEFAULT_BLINKING_SPEED = 500;
declare type Props = {
    maskSymbol: string;
    isLastFilledCell: boolean;
    children: string;
    delay?: number;
};
declare const MaskSymbol: ({ isLastFilledCell, children: symbol, maskSymbol, delay, }: Props) => JSX.Element;
export default MaskSymbol;
