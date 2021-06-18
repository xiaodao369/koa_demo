/*
 * @Description: 登录接口
 * @Author: 小道
 * @Date: 2021-06-10 11:58:29
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-18 16:32:45
 */

import AppConfig from "../../../config/AppConfig";
import { API, POST } from "../../core/route/RouterManager";
import LoginLogic from "../logic/LoginLogic";

@API("login")
export default class LoginApi {

    /**
     * @api {post}  /login/getInfo 获取用户数据
     * @apiDescription 获取用户数据
     * @apiName getInfo
     * @apiGroup login
     * @apiParam {string} username 账户名
     * @apiParam {string} password 密码
     * @apiSuccess {number} code 0.登录成功 1.账号不能为空 2.密码不能为空（本地不需要）3.账户不存在（本地自动创建） 4.密码错误
     * @apiSuccess {string} token token
     * @apiSuccess {object} data
     * @apiVersion 1.0.0
     */
    @POST("getInfo")
    async login(data: { username: string, password: string }) {
        if (data.username == null || data.username.length < 1) return { code: 1 };
        if (data.password == null || data.password == "") {
            if (AppConfig.development) data.password = "123456";
            else return { code: 2 };
        }
        let result = await new LoginLogic().getInfo(data.username, data.password);
        return result;
    }
}
