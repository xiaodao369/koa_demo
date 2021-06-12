/*
 * @Description: mysql 管理类
 * @Autor: 小道
 * @Date: 2021-06-11 21:38:54
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-12 14:13:10
 */

import { createConnection } from "typeorm";
import { UserBaseEntity } from "../../game/entity/UserBaseEntity";
import { BaseSingle } from "../base/BaseSingle";

export default class MysqlManager extends BaseSingle{

    constructor(){
        super();
    }

    /**连接mysql
     * @param entityPath entity实体路径
     */
    async init(entityPath:string){
        return createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "369369",
            database: "koa_demo",
            // synchronize: true,
            entities: [entityPath + "/*.js"]
          })
    }
}
