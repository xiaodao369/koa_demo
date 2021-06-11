/*
 * @Description: 主入口
 * @Author: 小道
 * @Date: 2021-06-09 15:56:53
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-11 11:36:47
 */

import Koa from "koa";
import serve from "koa-static";
import { RouterManager } from "./app/core/route/RouterManager";

const app = new Koa();


const router = RouterManager.instance().init(__dirname.replace(/\\/g, '/') + "/app/game/api");

// router.get("", async ctx => {
//     ctx.body = "你好! 111";
// })

app.use(serve(__dirname.replace(/\\/g, '/').replace("dist", "") + "apidoc", { extensions: ["html"] }))

app.use((ctx, next) => {
    try {
        next()
    } catch (err) {
        // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
        console.error("触发错误")
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

app.use(router.routes());
app.listen(30001);
console.info("start server listen 30001");

