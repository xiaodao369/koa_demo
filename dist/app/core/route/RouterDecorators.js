"use strict";
/*
 * @Description: 一级路径类装饰器
 * @Author: 小道
 * @Date: 2021-06-09 17:55:10
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-10 15:10:14
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
var Controller = function (prefix) {
    if (prefix === void 0) { prefix = ''; }
    return function (target) {
        //属性注入
        Reflect.defineProperty(target, "prefix", { value: prefix });
    };
};
exports.Controller = Controller;
