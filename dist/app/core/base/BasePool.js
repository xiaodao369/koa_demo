"use strict";
/*
 * @Description: 对象池基类
 * @Author: 小道
 * @Date: 2021-06-11 18:25:43
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-11 20:39:10
 */
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
var BaseSingle_1 = require("./BaseSingle");
var BasePool = /** @class */ (function (_super) {
    __extends(BasePool, _super);
    function BasePool(name) {
        var _this = _super.call(this) || this;
        _this._createNum = 0;
        _this._name = name;
        _this._objArr = [];
        return _this;
    }
    /**获取 */
    BasePool.prototype.get = function () {
        var obj = this._objArr.shift();
        if (!obj)
            obj = this.create();
        return obj;
    };
    /**回收 */
    BasePool.prototype.put = function (handler) {
        this._objArr.push(handler);
    };
    /**对象池数据 */
    BasePool.prototype.count = function () {
        var len = this._objArr.length;
        console.log(this._name + '对象池：', len + "/" + this._createNum);
    };
    /**创建一个对象 (自定义重写)*/
    BasePool.prototype.create = function () {
        return {};
    };
    return BasePool;
}(BaseSingle_1.BaseSingle));
exports.default = BasePool;
