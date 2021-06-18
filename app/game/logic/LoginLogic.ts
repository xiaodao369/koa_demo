/*
 * @Description: 登录逻辑
 * @Author: 小道
 * @Date: 2021-06-16 19:43:29
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-18 16:40:56
 */

import { getCustomRepository } from "typeorm"
import AppConfig from "../../../config/AppConfig";
import LoginRepository from "../repository/LoginRepository"

export default class LoginLogic {

    private _userRepository = getCustomRepository(LoginRepository)
    /**获取用户信息 */
    async getInfo(username: string, password: string) {
        let account = await this._userRepository.getAccount(username);
        if (account == null) {//不存在用户 
            if (!AppConfig.development) return { code: 3 };
            //本地环境自动创建
            await this._userRepository.createAccount(username, password);
        } else {
            //密码验证
            let result = await this._userRepository.passwordVerification(password, account.password!)
            if (!result) return { code: 4 };
        }
        console.log(account);
        return { code: 0 }
    }
}
