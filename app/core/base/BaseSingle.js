"use strict";
/*
 * @Description: 单例基类
 * @Author: 小道
 * @Date: 2021-06-10 10:51:58
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-10 15:44:51
 */
exports.__esModule = true;
exports.BaseSingle = void 0;
var BaseSingle = /** @class */ (function () {
    function BaseSingle() {
        if (this._instance)
            throw "create new single class";
    }
    BaseSingle.instance = function () {
        if (this._instance == null) {
            this._instance = new this();
        }
        return this._instance;
    };
    return BaseSingle;
}());
exports.BaseSingle = BaseSingle;
