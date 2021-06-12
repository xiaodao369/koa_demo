"use strict";
/*
 * @Description: 登录接口
 * @Author: 小道
 * @Date: 2021-06-10 11:58:29
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-11 11:54:38
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var RouterManager_1 = require("../../core/route/RouterManager");
var LoginApi = /** @class */ (function () {
    function LoginApi() {
    }
    /**
     * @api {get}  /login/getInfo 获取用户数据0
     * @apiDescription 获取用户数据
     * @apiName getInfo
     * @apiGroup login
     * @apiVersion 1.0.0
     */
    LoginApi.prototype.login = function (ctx) {
        ctx.body = { ok: "11111" };
    };
    __decorate([
        RouterManager_1.GET("getInfo"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], LoginApi.prototype, "login", null);
    LoginApi = __decorate([
        RouterManager_1.API("login")
    ], LoginApi);
    return LoginApi;
}());
exports.default = LoginApi;
