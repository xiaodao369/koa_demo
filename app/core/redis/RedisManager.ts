import * as redis from "redis";
import { BaseSingle } from "../base/BaseSingle";

/*
 * @Description: redis管理类
 * @Author: 小道
 * @Date: 2021-06-11 16:49:06
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-11 18:10:03
 */
export default class RedisManager extends BaseSingle {

    private _config = {
        port: 6379,
        host: '127.0.0.1',
        db: 0
    }

    private _redisClient: redis.RedisClient;

    constructor() {
        super();
        this._redisClient = redis.createClient(this._config);
        this._redisClient.on("error", this.onError.bind(this));
        this._redisClient.on("connect", this.onConnect.bind(this));
    }

    private onError(error: redis.RedisError): void {
        console.error(error);
    }

    private onConnect(): void {
        console.log("redis connect");
    }

    get redis(): redis.RedisClient {
        return this._redisClient;
    }
}
