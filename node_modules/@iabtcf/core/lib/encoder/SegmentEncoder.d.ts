import { Segment } from '../model';
import { TCModel } from '../';
export declare class SegmentEncoder {
    private static fieldSequence;
    static encode(tcModel: TCModel, segment: Segment): string;
    static decode(encodedString: string, tcModel: TCModel, segment: string): TCModel;
    private static isPublisherCustom;
}
