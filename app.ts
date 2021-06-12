/*
 * @Description: 主入口
 * @Author: 小道
 * @Date: 2021-06-09 15:56:53
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-12 17:19:42
 */

import Koa from "koa";
import serve from "koa-static";
import MysqlManager from "./app/core/mysql/MysqlManager";
import RedisManager from "./app/core/redis/RedisManager";
import { RouterManager } from "./app/core/route/RouterManager";
import * as path from "path";
import * as fs from "fs";
import bodyParser from "koa-bodyparser";
const app = new Koa();

app.use(bodyParser({
    onerror: function (err, ctx) {
        ctx.throw('body parse error', 422);
    }
}));

//路由表映射
const router = RouterManager.instance().init(__dirname.replace(/\\/g, '/') + "/app/game/api");
app.use(router.routes());

//静态api文档
app.use(serve(path.join( __dirname,"..","apidoc" )))

//koa2 错误处理
app.use((ctx, next) => {
    try {
        //禁用koa-bodyparser
        // if (ctx.path === '/disable') ctx.disableBodyParser = true;
        next()
    } catch (err) {
        // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
        
        app.emit('error', err, this)
        const status = err.status || 500
        // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
        const error = err.message
        // 从 error 对象上读出各个属性，设置到响应中
        ctx.body = {
            code: status, // 服务端自身的处理逻辑错误(包含框架错误500 及 自定义业务逻辑错误533开始 ) 客户端请求参数导致的错误(4xx开始)，设置不同的状态码
            error: error
        }
        if (status === 422) {
            ctx.body.detail = err.errors
        }
        ctx.status = 200
    }
})


//启动redis连接
RedisManager.instance().init();
//启动mysql连接
MysqlManager.instance().init(__dirname.replace(/\\/g, '/') + "/app/game/entity")

//启动服务器
app.listen(36362);
console.info("start server listen 36362");



