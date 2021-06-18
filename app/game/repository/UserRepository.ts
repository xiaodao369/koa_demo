/*
 * @Description: 用户信息数据操作类
 * @Autor: 小道
 * @Date: 2021-06-12 13:40:05
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-16 20:04:39
 */

import { EntityManager, EntityRepository } from "typeorm";
import { UserBaseEntity } from "../entity/UserBaseEntity";

@EntityRepository()
export default class UserRepository {

    constructor(private _manager: EntityManager) { };

    createUser(nick: string, head: string, sex: number) {
        const user = new UserBaseEntity();
        user.nick = nick;
        user.head = head;
        user.sex = sex;
        return this._manager.save(user);
    }
}
