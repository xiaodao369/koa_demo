import * as redis from "redis";
import { BaseSingle } from "../base/BaseSingle";

/*
 * @Description: redis管理类
 * @Author: 小道
 * @Date: 2021-06-11 16:49:06
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-11 18:24:47
 */
export default class RedisManager extends BaseSingle {

    private _config = {
        port: 6379,
        host: '127.0.0.1',
        db: 0
    }

    constructor() {
        super();
    }

    get(): redis.RedisClient {

    }
}
