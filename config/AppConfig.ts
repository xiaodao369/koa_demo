import { Log4jsLevel } from "../app/core/log4js/LogManager";

/*
 * @Description: 项目配置文件
 * @Author: 小道
 * @Date: 2021-06-15 10:16:21
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-16 10:34:42
 */
export default class AppConfig {
    /**消息加密 */
    static readonly encryption: boolean
    /**是否开发环境 */
    static readonly development: boolean = true;
    /**log等级 */
    static readonly log4jsLevel = Log4jsLevel.DEBUG;
    static readonly debug = {
        prot: 30001,
        redis: {
            port: 6379,
            host: '127.0.0.1',
            db: 0
        },
        mysql: {
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "369369",
            database: "koa_demo"
        },
    }

    static readonly release = {
        prot: 30001,
        redis: {
            port: 6379,
            host: '127.0.0.1',
            db: 0
        },
        mysql: {
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "369369",
            database: "koa_demo"
        },
    };


}


