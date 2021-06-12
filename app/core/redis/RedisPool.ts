/*
 * @Description: redis 对象池
 * @Author: 小道
 * @Date: 2021-06-11 18:36:18
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-11 20:53:02
 */
import * as redis from "redis";
import BasePool from "../base/BasePool";
export default class RedisPool extends BasePool<redis.RedisClient>{

    private _config = {
        port: 6379,
        host: '127.0.0.1',
        db: 0
    }

    constructor(){
        super("RedisPool")
    }

    protected create():redis.RedisClient{
        let client = redis.createClient(this._config);
        client.on("error",error=>{
            console.error("redis error：",error);
        })
        return client;
    }
}