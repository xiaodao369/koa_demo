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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseSingle_1 = require("../base/BaseSingle");
var RedisPool_1 = __importDefault(require("./RedisPool"));
/*
 * @Description: redis管理类
 * @Author: 小道
 * @Date: 2021-06-11 16:49:06
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-12 10:10:26
 */
var RedisManager = /** @class */ (function (_super) {
    __extends(RedisManager, _super);
    function RedisManager() {
        return _super.call(this) || this;
    }
    /**初始化 默认建立一个连接 */
    RedisManager.prototype.init = function () {
        var client = RedisPool_1.default.instance().get();
        RedisPool_1.default.instance().put(client);
    };
    Object.defineProperty(RedisManager.prototype, "redis", {
        get: function () {
            var client = RedisPool_1.default.instance().get();
            if (!client.connected) {
                RedisPool_1.default.instance().put(client);
                client = RedisPool_1.default.instance().get();
            }
            return client;
        },
        enumerable: false,
        configurable: true
    });
    return RedisManager;
}(BaseSingle_1.BaseSingle));
exports.default = RedisManager;
