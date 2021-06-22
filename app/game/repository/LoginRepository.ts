/*
 * @Description: 登录数据操作
 * @Author: 小道
 * @Date: 2021-06-16 20:02:50
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-22 09:40:21
 */

import { EntityManager, EntityRepository } from "typeorm";
import AccountEntity from "../entity/AccountEntity";
import * as bcrypt from "bcrypt";

@EntityRepository()
export default class LoginRepository {

    private _salt: number = 9;

    constructor(private _manager: EntityManager) { }

    /**根据useranme获取账户 */
    async getAccountByUserName(username: string) {
        let account = await this._manager
            .createQueryBuilder(AccountEntity, "account")
            .where("account.username = :username", { username })
            .getOne();
        return account;
    }

    /**根据uid 获取账户*/
    async getAccountByUid(uid: string) {
        let account = await this._manager
            .createQueryBuilder(AccountEntity, "account")
            .where("account.uid = :uid", { uid })
            .getOne();
        return account;
    }

    /**创建账户 */
    async createAccount(username: string, password: string) {
        let hashPassword = await this.getHashPassword(password)
        let account = await this._manager
            .createQueryBuilder(AccountEntity, "account")
            .insert()
            .into(AccountEntity)
            .values({ username: username, password: hashPassword })
            .execute();
        return account;
    }

    private async getHashPassword(password: string) {
        const salt = await bcrypt.genSaltSync(9);
        let hashPassword = await bcrypt.hashSync(password, salt);
        return hashPassword;
    }

    /**密码验证 */
    async passwordVerification(p1: string, p2: string) {
        return await bcrypt.compareSync(p1, p2);
    }
}
