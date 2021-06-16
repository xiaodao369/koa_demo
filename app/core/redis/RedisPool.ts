/*
 * @Description: redis 对象池
 * @Author: 小道
 * @Date: 2021-06-11 18:36:18
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-15 18:01:09
 */
import * as redis from "redis";
import AppConfig from "../../../config/AppConfig";
import BasePool from "../base/BasePool";
import { LogManager } from "../log4js/LogManager";
export default class RedisPool extends BasePool<redis.RedisClient>{

    constructor() {
        super("RedisPool")
    }

    protected create(): redis.RedisClient {
        let client = redis.createClient(AppConfig.development == true ? AppConfig.debug.redis : AppConfig.release.redis);
        client.on("error", error => {
            LogManager.instance().redisLog.error("redis error：", error);
        })
        client.on("connect", () => {
            LogManager.instance().redisLog.debug("redis connect success");
        })
        return client;
    }
}