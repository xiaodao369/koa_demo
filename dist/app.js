"use strict";
/*
 * @Description: 主入口
 * @Author: 小道
 * @Date: 2021-06-09 15:56:53
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-12 14:58:27
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var koa_1 = __importDefault(require("koa"));
var koa_static_1 = __importDefault(require("koa-static"));
var MysqlManager_1 = __importDefault(require("./app/core/mysql/MysqlManager"));
var RedisManager_1 = __importDefault(require("./app/core/redis/RedisManager"));
var RouterManager_1 = require("./app/core/route/RouterManager");
var path = __importStar(require("path"));
var app = new koa_1.default();
//路由表映射
var router = RouterManager_1.RouterManager.instance().init(__dirname.replace(/\\/g, '/') + "/app/game/api");
app.use(router.routes());
//静态api文档
app.use(koa_static_1.default(path.join(__dirname, "..", "apidoc")));
//koa2 错误处理
app.use(function (ctx, next) {
    try {
        next();
    }
    catch (err) {
        // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
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
//启动redis连接
RedisManager_1.default.instance().init();
//启动mysql连接
MysqlManager_1.default.instance().init(__dirname.replace(/\\/g, '/') + "/app/game/entity");
//启动服务器
app.listen(36362);
console.info("start server listen 36362");
