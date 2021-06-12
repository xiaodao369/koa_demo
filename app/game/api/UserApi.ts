/*
 * @Description: 用户信息接口
 * @Author: 小道
 * @Date: 2021-06-11 15:42:00
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-12 15:14:00
 */

import { Context } from "koa";
import { API, GET, POST } from "../../core/route/RouterManager";
import UserLogic from "../logic/UserLogic";

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
        console.log(JSON.stringify(ctx.querystring))
        ctx.body = { code: 0 };
    }

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
    @POST("create")
    async create(ctx:Context){
        console.log(JSON.stringify(ctx));
        let logic = new UserLogic();
        let result = await logic.create();
        ctx.status = 200;
        ctx.body = result;
    }
}
