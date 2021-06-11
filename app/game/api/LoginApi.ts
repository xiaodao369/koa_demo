/*
 * @Description: 登录接口
 * @Author: 小道
 * @Date: 2021-06-10 11:58:29
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-11 10:02:13
 */

import { Context } from "koa";
import { API, GET } from "../../core/route/RouterManager";

@API("login")
export default class LoginApi {

    @GET("getInfo")
    login(ctx: Context) {
        ctx.body = { ok: "11111" };
    }
}
