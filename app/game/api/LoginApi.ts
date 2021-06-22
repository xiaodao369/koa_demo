/*
 * @Description: 登录接口
 * @Author: 小道
 * @Date: 2021-06-10 11:58:29
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-22 09:41:54
 */

import AppConfig from "../../../config/AppConfig";
import { API, POST } from "../../core/route/RouterManager";
import LoginLogic from "../logic/LoginLogic";

@API("login")
export default class LoginApi {

    /**
     * @api {post}  /login/loginAuto 登录请求
     * @apiDescription 登录请求
     * @apiName loginAuto
     * @apiGroup login
     * @apiParam {string} username 账户名
     * @apiParam {string} password 密码
     * @apiSuccess {number} code 0.登录成功 1.账号错误 2.密码错误（本地不需要）3.账户不存在（本地自动创建） 4.密码错误
     * @apiSuccess {string} token token
     * @apiVersion 1.0.0
     */
    @POST("loginAuto")
    async loginAuto(data: { username: string, password: string }) {
        if (data.username == null || data.username.length < 1) return { code: 1 };
        if (data.password == null || data.password == "") {
            if (AppConfig.development) data.password = "123456";
            else return { code: 2 };
        }
        let result = await new LoginLogic().loginAuto(data.username, data.password);
        return result;
    }

    /**
     * @api {post} /login/resetToken 重置token
     * @apiDescription 重置token
     * @apiName resetToken
     * @apiGroup login
     * @apiParam {string} uid 用户uid
     * @apiParam {string} token
     * @apiSuccess {number} code 0.成功 1.token错误 2.用户不存在
     * @apiSuccess {string} token token
     */
    @POST("resetToken")
    async resetToken(data: { token: string, uid: string }) {
        if (data.uid == null || data.uid === "") return { code: 2 };
        if (data.token == null || data.token === "") return { code: 1 };
        let result = await new LoginLogic().resetToken(data.token, data.uid);
        return result;
    }
}
