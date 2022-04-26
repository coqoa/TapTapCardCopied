"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AdError extends Error {
  /**
   * AdError
   * @param message - The error description message.
   * @param code - The error code.
   * @link https://support.google.com/admob/answer/9905175
   */
  constructor(message, code) {
    super();
    this.message = message;
    this.code = code;

    _defineProperty(this, "name", 'AdError');
  }

}

exports.default = AdError;
//# sourceMappingURL=AdError.js.map