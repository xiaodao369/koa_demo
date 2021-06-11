/*
 * @Description: 一级路径类装饰器
 * @Author: 小道
 * @Date: 2021-06-09 17:55:10
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-10 15:10:14
 */

export const Controller = (prefix: string = ''): ClassDecorator => {
    return (target: any) => {
        //属性注入
        Reflect.defineProperty(target, "prefix", { value: prefix })
    };
};