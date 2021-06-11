"use strict";
/*
 * @Description: 主入口
 * @Author: 小道
 * @Date: 2021-06-09 15:56:53
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-11 18:18:54
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var koa_1 = __importDefault(require("koa"));
var koa_static_1 = __importDefault(require("koa-static"));
var RedisManager_1 = __importDefault(require("./app/core/redis/RedisManager"));
var RouterManager_1 = require("./app/core/route/RouterManager");
var app = new koa_1.default();
//启动redis连接
RedisManager_1.default.instance();
var router = RouterManager_1.RouterManager.instance().init(__dirname.replace(/\\/g, '/') + "/app/game/api");
app.use(koa_static_1.default(__dirname.replace(/\\/g, '/').replace("dist", "") + "apidoc", { extensions: ["html"] }));
app.use(function (ctx, next) {
    try {
        next();
    }
    catch (err) {
        // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
        console.error("触发错误");
        app.emit('error', err, _this);
        var status_1 = err.status || 500;
        // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
        var error = err.message;
        // 从 error 对象上读出各个属性，设置到响应中
        ctx.body = {
            code: status_1,
            error: error
        };
        if (status_1 === 422) {
            ctx.body.detail = err.errors;
        }
        ctx.status = 200;
    }
});
app.use(router.routes());
app.listen(30001);
console.info("start server listen 30001");
