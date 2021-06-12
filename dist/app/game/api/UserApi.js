"use strict";
/*
 * @Description: 用户信息接口
 * @Author: 小道
 * @Date: 2021-06-11 15:42:00
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-12 15:14:00
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RouterManager_1 = require("../../core/route/RouterManager");
var UserLogic_1 = __importDefault(require("../logic/UserLogic"));
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
        console.log(JSON.stringify(ctx.querystring));
        ctx.body = { code: 0 };
    };
    /**
     * @api {POST} /user/create 创建用户
     * @apiDescription 创建用户
     * @apiName create
     * @apiGroup user
     * @apiVersion 1.0.0
     * @apiHeader {string} access-key
     * @apiParam {string} name 用户名称
     * @apiParam {string} head 头像
     * @apiParam {number} sex 性别
     * @apiSuccess {object} data {code:number}
     * @apiSuccess {number} code 0.设置成功
     */
    UserApi.prototype.create = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var logic, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(JSON.stringify(ctx));
                        logic = new UserLogic_1.default();
                        return [4 /*yield*/, logic.create()];
                    case 1:
                        result = _a.sent();
                        ctx.status = 200;
                        ctx.body = result;
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        RouterManager_1.GET("setName"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String]),
        __metadata("design:returntype", void 0)
    ], UserApi.prototype, "setName", null);
    __decorate([
        RouterManager_1.POST("create"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], UserApi.prototype, "create", null);
    UserApi = __decorate([
        RouterManager_1.API("user")
    ], UserApi);
    return UserApi;
}());
exports.default = UserApi;
