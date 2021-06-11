"use strict";
/*
 * @Description: 对象池基类
 * @Author: 小道
 * @Date: 2021-06-11 18:25:43
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-11 18:35:51
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
exports.BseePool = void 0;
var BaseSingle_1 = require("./BaseSingle");
var BseePool = /** @class */ (function (_super) {
    __extends(BseePool, _super);
    function BseePool(name) {
        var _this = _super.call(this) || this;
        _this._createNum = 0;
        _this._name = name;
        _this._objArr = [];
        return _this;
    }
    /**获取 */
    BseePool.prototype.get = function () {
        var obj = this._objArr.shift();
        if (!obj)
            obj = this.create();
        return obj;
    };
    /**回收 */
    BseePool.prototype.put = function (handler) {
        this._objArr.push(handler);
    };
    /**对象池数据 */
    BseePool.prototype.count = function () {
        var len = this._objArr.length;
        console.log(this._name + '对象池：', len + "/" + this._createNum);
    };
    /**创建一个对象 (自定义重写)*/
    BseePool.prototype.create = function () {
        return {};
    };
    return BseePool;
}(BaseSingle_1.BaseSingle));
exports.BseePool = BseePool;
