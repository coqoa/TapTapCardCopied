import { PurposeRestrictionVector } from '../../model';
export declare class PurposeRestrictionVectorEncoder {
    static encode(prVector: PurposeRestrictionVector): string;
    static decode(encodedString: string): PurposeRestrictionVector;
}
