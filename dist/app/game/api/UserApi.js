"use strict";
/*
 * @Description: 用户信息接口
 * @Author: 小道
 * @Date: 2021-06-11 15:42:00
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-11 16:32:33
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var RouterManager_1 = require("../../core/route/RouterManager");
var UserApi = /** @class */ (function () {
    function UserApi() {
    }
    /**
     * @api {get} /user/setName 设置名称
     * @apiDescription 设置用户名称
     * @apiName setName
     * @apiGroup user
     * @apiVersion 1.0.0
     * @apiHeader {string} access-key
     * @apiParam {string} name 用户名称
     * @apiSuccess {object} data {code:number}
     * @apiSuccess {number} code 0.设置成功
     */
    UserApi.prototype.setName = function (ctx, name) {
        console.log(JSON.stringify(ctx));
        ctx.body = { code: 0 };
    };
    __decorate([
        RouterManager_1.GET("setName")
    ], UserApi.prototype, "setName", null);
    UserApi = __decorate([
        RouterManager_1.API("user")
    ], UserApi);
    return UserApi;
}());
exports.default = UserApi;
