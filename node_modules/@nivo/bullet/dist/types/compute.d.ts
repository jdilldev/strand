import { BulletItemProps, BulletRectsProps, ComputedRangeDatum } from './types';
import { getColorScale } from '@nivo/core';
declare type ComputeRect = Pick<BulletRectsProps, 'layout' | 'reverse' | 'scale' | 'height'>;
export declare const stackValues: (values: number[], scale: BulletItemProps['scale'], colorScale: ReturnType<getColorScale>, type: 'range' | 'measures', useAverage?: boolean) => ComputedRangeDatum[];
export declare const getComputeRect: ({ layout, reverse, scale, height }: ComputeRect) => (d: ComputedRangeDatum) => {
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare const computeRects: ({ data, layout, reverse, scale, height, }: Pick<BulletRectsProps, 'data'> & ComputeRect) => {
    x: number;
    y: number;
    width: number;
    height: number;
    data: ComputedRangeDatum;
}[];
export {};
//# sourceMappingURL=compute.d.ts.map