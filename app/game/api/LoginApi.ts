/*
 * @Description: 登录接口
 * @Author: 小道
 * @Date: 2021-06-10 11:58:29
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-11 11:54:38
 */

import { Context } from "koa";
import { API, GET } from "../../core/route/RouterManager";

@API("login")
export default class LoginApi {

    /**
     * @api {get}  /login/getInfo 获取用户数据0
     * @apiDescription 获取用户数据
     * @apiName getInfo
     * @apiGroup login
     * @apiVersion 1.0.0
     */
    @GET("getInfo")
    login(ctx: Context) {
        ctx.body = { ok: "11111" };
    }
}
