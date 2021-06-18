/*
 * @Description: 主入口
 * @Author: 小道
 * @Date: 2021-06-09 15:56:53
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-16 17:19:44
 */

import Koa, { Context } from "koa";
import serve from "koa-static";
import MysqlManager from "./app/core/mysql/MysqlManager";
import RedisManager from "./app/core/redis/RedisManager";
import { RouterManager } from "./app/core/route/RouterManager";
import * as path from "path";
import bodyParser from "koa-bodyparser";
import AppConfig from "./config/AppConfig";
import { LogManager } from "./app/core/log4js/LogManager";


//初始化日志
LogManager.instance();
LogManager.instance().logger.debug("---------------------------start app---------------------------");

const app = new Koa();

const errorHandle = function (ctx: Context, next: any) {
    try {
        //禁用koa-bodyparser
        // if (ctx.path === '/disable') ctx.disableBodyParser = true;
        LogManager.instance().httpLog.error(ctx.request.method + " " + ctx.request.url, ctx.response.status + " " + ctx.response.message);
        next();
    } catch (err) {
        // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
        LogManager.instance().httpLog.error(err);
        app.emit('error', err)
        const status = err.status || 500
        // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
        const error = err.message
        // 从 error 对象上读出各个属性，设置到响应中
        ctx.body = {
            code: status, // 服务端自身的处理逻辑错误(包含框架错误500 及 自定义业务逻辑错误533开始 ) 客户端请求参数导致的错误(4xx开始)，设置不同的状态码
            error: error
        }
        if (status === 422) {
            (ctx.body as any).detail = err.errors
        }
        ctx.status = 200
    }
}

//路由表映射
const router = RouterManager.instance().init(__dirname.replace(/\\/g, '/') + "/app/game/api");

/**post 消息解析 */
app.use(bodyParser({
    onerror: function (err, ctx) {
        ctx.throw('body parse error', 422);
    },
}));

//路由
app.use(router.routes());

//静态api文档
app.use(serve(path.join(__dirname, "..", "apidoc")))

//koa2 错误处理
app.use(errorHandle)

//启动redis连接
RedisManager.instance().init();
//启动mysql连接
MysqlManager.instance().init(__dirname.replace(/\\/g, '/') + "/app/game/entity")

//启动服务器
let port: number = AppConfig.development == true ? AppConfig.debug.prot : AppConfig.release.prot;
app.listen(port, () => { LogManager.instance().logger.debug("start server listen：" + port + " | is development：" + AppConfig.development); });




