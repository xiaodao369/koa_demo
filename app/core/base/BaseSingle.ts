/*
 * @Description: 单例基类
 * @Author: 小道
 * @Date: 2021-06-10 10:51:58
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-10 15:44:51
 */

export class BaseSingle {

    constructor() {
        if ((<any>this)._instance) throw "create new single class";
    }

    static instance<T extends {}>(this: new () => T): T {
        if ((<any>this)._instance == null) {
            (<any>this)._instance = new this();
        }
        return (<any>this)._instance;
    }
}