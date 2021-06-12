/*
 * @Description: 对象池基类
 * @Author: 小道
 * @Date: 2021-06-11 18:25:43
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-11 20:39:10
 */

import { BaseSingle } from "./BaseSingle";

export default class BasePool<classType> extends BaseSingle {

    protected _objArr: classType[];
    protected _createNum: number = 0;
    protected _name: string;

    constructor(name: string) {
        super();
        this._name = name;
        this._objArr = [];
    }

    /**获取 */
    get(): classType {
        let obj = this._objArr.shift();
        if (!obj) obj = this.create();
        return obj!;
    }

    /**回收 */
    put(handler: classType): void {
        this._objArr.push(handler);
    }

    /**对象池数据 */
    count(): void {
        let len: number = this._objArr.length;
        console.log(this._name + '对象池：', len + "/" + this._createNum);
    }

    /**创建一个对象 (自定义重写)*/
    protected create(): classType {
        return {} as classType;
    }
}
