/*
 * @Description: 用户逻辑操作类
 * @Autor: 小道
 * @Date: 2021-06-12 13:48:26
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-12 13:53:37
 */

import { getCustomRepository } from "typeorm";
import UserRepository from "../repository/UserRepository";

export default class UserLogic{

    private _userRepository = getCustomRepository(UserRepository)

    /**创建用户 */
    async create(){
        await this._userRepository.createUser("ceshi","1111",1);
        return {code:0};
    }
}