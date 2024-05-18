/// <reference types="react" />
import { Datum, CommonBulletProps } from './types';
export declare const useEnhancedData: (data: Datum[], { layout, maxValue, minValue, reverse, height, width, }: Pick<CommonBulletProps, 'layout' | 'reverse' | 'height' | 'width'> & Record<'maxValue' | 'minValue', number | undefined>) => {
    scale: import("@nivo/scales").ScaleLinear<number>;
    id: import("./types").DatumId;
    title?: import("react").ReactNode;
    ranges: number[];
    measures: number[];
    markers?: number[] | undefined;
}[];
//# sourceMappingURL=hooks.d.ts.map