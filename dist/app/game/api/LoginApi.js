"use strict";
/*
 * @Description: 登录接口
 * @Author: 小道
 * @Date: 2021-06-10 11:58:29
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-11 10:02:13
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var RouterManager_1 = require("../../core/route/RouterManager");
var LoginApi = /** @class */ (function () {
    function LoginApi() {
    }
    LoginApi.prototype.login = function (ctx) {
        ctx.body = { ok: "11111" };
    };
    __decorate([
        RouterManager_1.GET("getInfo")
    ], LoginApi.prototype, "login", null);
    LoginApi = __decorate([
        RouterManager_1.API("login")
    ], LoginApi);
    return LoginApi;
}());
exports.default = LoginApi;
