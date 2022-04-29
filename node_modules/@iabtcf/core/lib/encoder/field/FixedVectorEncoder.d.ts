import { Vector } from '../../model';
export declare class FixedVectorEncoder {
    static encode(value: Vector, numBits: number): string;
    static decode(value: string, numBits: number): Vector;
}
