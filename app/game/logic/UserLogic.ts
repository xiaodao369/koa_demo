/*
 * @Description: 用户逻辑操作类
 * @Autor: 小道
 * @Date: 2021-06-12 13:48:26
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-12 17:22:42
 */

import { getCustomRepository } from "typeorm";
import UserRepository from "../repository/UserRepository";

export default class UserLogic{

    private _userRepository = getCustomRepository(UserRepository)

    /**创建用户 */
    async create(data:{nick:string, head:string, sex:number}){
        await this._userRepository.createUser(data.nick,data.head,data.sex);
        return {code:0};
    }
}