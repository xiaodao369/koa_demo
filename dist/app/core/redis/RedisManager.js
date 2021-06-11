"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseSingle_1 = require("../base/BaseSingle");
/*
 * @Description: redis管理类
 * @Author: 小道
 * @Date: 2021-06-11 16:49:06
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-11 18:24:47
 */
var RedisManager = /** @class */ (function (_super) {
    __extends(RedisManager, _super);
    function RedisManager() {
        var _this = _super.call(this) || this;
        _this._config = {
            port: 6379,
            host: '127.0.0.1',
            db: 0
        };
        return _this;
    }
    RedisManager.prototype.get = function () {
    };
    return RedisManager;
}(BaseSingle_1.BaseSingle));
exports.default = RedisManager;
