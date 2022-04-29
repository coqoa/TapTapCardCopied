import { SequenceVersionMap } from './SequenceVersionMap';
import { TCModel } from '../../';
import { EncodingOptions } from '../EncodingOptions';
import { Segment } from '../../model';
export declare class SegmentSequence implements SequenceVersionMap {
    '1': Segment[];
    '2': Segment[];
    constructor(tcModel: TCModel, options?: EncodingOptions);
}
