/*
 * @Description: 登录逻辑
 * @Author: 小道
 * @Date: 2021-06-16 19:43:29
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-22 16:26:53
 */

import { getCustomRepository } from "typeorm"
import AppConfig from "../../../config/AppConfig";
import { LogManager } from "../../core/log4js/LogManager";
import RedisManager from "../../core/redis/RedisManager";
import { TokenUtils } from "../../utils/TokenUtils";
import LoginRepository from "../repository/LoginRepository"

export default class LoginLogic {

    private _userRepository = getCustomRepository(LoginRepository)
    /**获取用户信息 */
    async loginAuto(username: string, password: string) {
        let account = await this._userRepository.getAccountByUserName(username);
        let uid: string;
        if (account == null) {//不存在用户 
            if (!AppConfig.development) return { code: 3 };
            //本地环境自动创建
            uid = await this.createAccount(username, password);
        } else { //密码验证
            let result = await this._userRepository.passwordVerification(password, account.password!)
            if (!result) return { code: 2 };
            uid = account.uid!.toString();
        }
        const newToken = this.getTokenAndSave(uid, username);
        return { code: 0, token: newToken };
    }

    /**重置token
     * @param oldToken
     * @param reqUid
     */
    async resetToken(oldToken: string, reqUid: string): Promise<{ code: number, token?: string }> {
        const self = this;
        return new Promise((resolve, reject) => {
            const redis = RedisManager.instance().redis;
            redis.hget(TokenUtils.redis_key_token, reqUid, (err, tokenData) => {
                if (err) LogManager.instance().redisLog.error(err.message);
                else if (tokenData == null) { //不存在token记录 创建新token
                    self._userRepository.getAccountByUid(reqUid).then(account => {
                        if (account == null) {
                            resolve({ code: 2 })//用户不存在
                            return;
                        }
                        const newToken = self.getTokenAndSave(account.uid!.toString(), account.username!);
                        resolve({ code: 0, token: newToken });
                    });
                } else {
                    let { username, token, uid } = JSON.parse(tokenData);
                    if (token === oldToken) {
                        const newToken = self.getTokenAndSave(uid, username);
                        resolve({ code: 0, token: newToken });
                    } else {
                        resolve({ code: 1 });//token 错误
                    }
                }
            })
        })
    }

    /**创建账户
     * @param username
     * @param password
     * @returns sting uid
     */
    private createAccount(username: string, password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this._userRepository.createAccount(username, password).then(data => {
                resolve(data.generatedMaps[0].uid.toSting());
            }).catch(err => {
                LogManager.instance().mysqlLog.error(err);
            });
        })
    }

    /**获取token并保存
     * @param uid
     * @param username
     */
    private getTokenAndSave(uid: string, username: string): string {
        const token = TokenUtils.getToken(username!, uid);
        this.saveToRedisToken(token, username!, uid)
        return token;
    }

    /**存储token
     * @param token
     * @param username
     * @param uid
     */
    private async saveToRedisToken(token: string, username: string, uid: string) {
        const redisManager = RedisManager.instance();
        let isExists = await redisManager.exists(TokenUtils.redis_key_token);
        redisManager.redis.hset(TokenUtils.redis_key_token, uid, JSON.stringify({ username, uid, token }), err => {
            if (err) LogManager.instance().redisLog.error(err.message);
        });
        if (!isExists) { //设置过期时间
            let startTime = new Date().getTime(); // 当天0点
            let endTime = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime();
            let resultTime = endTime - startTime //距离凌晨剩余的时间
            if (resultTime < (1000 * 60 * 60 * 3)) { //小于3小时 延迟到第二天
                resultTime += (1000 * 60 * 60 * 4)
            }
            resultTime += (1000 * 60 * 60 * 3) //延迟到凌晨3点
            redisManager.redis.expire(TokenUtils.redis_key_token, 60 * 60)
        }
    }
}
