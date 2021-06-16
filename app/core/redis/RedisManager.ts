import * as redis from "redis";
import BaseSingle from "../base/BaseSingle";
import RedisPool from "./RedisPool";

/*
 * @Description: redis管理类
 * @Author: 小道
 * @Date: 2021-06-11 16:49:06
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-15 16:11:43
 */
export default class RedisManager extends BaseSingle {

    constructor() {
        super();
    }

    /**初始化 默认建立一个连接 */
    init(): void {
        let client = RedisPool.instance().get();
        RedisPool.instance().put(client);
    }

    get redis(): redis.RedisClient {
        let client = RedisPool.instance().get();
        if (!client.connected) {
            RedisPool.instance().put(client);
            client = RedisPool.instance().get()
        }
        return client;
    }
}
