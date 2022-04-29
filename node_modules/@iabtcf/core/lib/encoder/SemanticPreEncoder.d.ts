import { TCModel } from '../TCModel';
import { EncodingOptions } from './EncodingOptions';
export declare class SemanticPreEncoder {
    private static processor;
    static process(tcModel: TCModel, options?: EncodingOptions): TCModel;
}
