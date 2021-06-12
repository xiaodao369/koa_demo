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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Description: redis 对象池
 * @Author: 小道
 * @Date: 2021-06-11 18:36:18
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-11 20:53:02
 */
var redis = __importStar(require("redis"));
var BasePool_1 = __importDefault(require("../base/BasePool"));
var RedisPool = /** @class */ (function (_super) {
    __extends(RedisPool, _super);
    function RedisPool() {
        var _this = _super.call(this, "RedisPool") || this;
        _this._config = {
            port: 6379,
            host: '127.0.0.1',
            db: 0
        };
        return _this;
    }
    RedisPool.prototype.create = function () {
        var client = redis.createClient(this._config);
        client.on("error", function (error) {
            console.error("redis error：", error);
        });
        return client;
    };
    return RedisPool;
}(BasePool_1.default));
exports.default = RedisPool;