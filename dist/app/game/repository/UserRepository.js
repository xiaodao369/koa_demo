"use strict";
/*
 * @Description: 用户信息数据操作类
 * @Autor: 小道
 * @Date: 2021-06-12 13:40:05
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-12 13:45:08
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
var typeorm_1 = require("typeorm");
var UserBaseEntity_1 = require("../entity/UserBaseEntity");
var UserRepository = /** @class */ (function () {
    function UserRepository(manager) {
        this.manager = manager;
    }
    ;
    UserRepository.prototype.createUser = function (nick, head, sex) {
        var user = new UserBaseEntity_1.UserBaseEntity();
        user.nick = nick;
        user.head = head;
        user.sex = sex;
        return this.manager.save(user);
    };
    UserRepository = __decorate([
        typeorm_1.EntityRepository(),
        __metadata("design:paramtypes", [typeorm_1.EntityManager])
    ], UserRepository);
    return UserRepository;
}());
exports.default = UserRepository;
