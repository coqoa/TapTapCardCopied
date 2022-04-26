export default class AdError extends Error {
    readonly message: string;
    readonly code?: number | undefined;
    name: string;
    /**
     * AdError
     * @param message - The error description message.
     * @param code - The error code.
     * @link https://support.google.com/admob/answer/9905175
     */
    constructor(message: string, code?: number | undefined);
}
