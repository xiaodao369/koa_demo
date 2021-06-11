/*
 * @Description: 用户信息接口
 * @Author: 小道
 * @Date: 2021-06-11 15:42:00
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-11 16:32:33
 */

import { Context } from "koa";
import { API, GET } from "../../core/route/RouterManager";

@API("user")
export default class UserApi {

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
    @GET("setName")
    setName(ctx: Context, name: string): void {
        console.log(JSON.stringify(ctx))
        ctx.body = { code: 0 };
    }
}
