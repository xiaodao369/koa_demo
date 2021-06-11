/*
 * @Description: 路由管理
 * @Author: 小道
 * @Date: 2021-06-10 10:16:19
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-10 19:44:40
 */
import { resolve } from "path";
import { BaseSingle } from "../base/BaseSingle";
import KoaRouter from "koa-router";

const glob = require("glob");

export class RouterManager extends BaseSingle {

    /**路由表 */
    private _routerMap: Map<string, Map<string, RouterMap>>;
    private _postMap: Map<string, RouterMap>;
    private _getMap: Map<string, RouterMap>;
    private _putMap: Map<string, RouterMap>;
    private _deleteMap: Map<string, RouterMap>;
    private _apiPath: string = "app/game/api";
    private _router: KoaRouter;
    private _isInit: boolean = true;

    constructor() {
        super();
        this._routerMap = new Map();
        this._postMap = new Map();
        this._getMap = new Map();
        this._putMap = new Map();
        this._deleteMap = new Map();
        this._routerMap.set(ROUTER_REQUEST_TYPE.POST, this._postMap);
        this._routerMap.set(ROUTER_REQUEST_TYPE.GET, this._getMap);
        this._routerMap.set(ROUTER_REQUEST_TYPE.PUT, this._putMap);
        this._routerMap.set(ROUTER_REQUEST_TYPE.DELETE, this._deleteMap);
        this._router = new KoaRouter();
    }

    /**路由注入
     * @param apiDirPath api路径
     * @param force 强制更新
     */
    init(apiDirPath: string, force?: boolean): KoaRouter {
        if (this._isInit || force) {
            this._isInit = false
            // 进行引用目标文件夹中的所有子ts文件，全部导入内存的同时会进行装饰，对请求Map进行填充
            const files = glob.sync(resolve(apiDirPath + "/*.{js,ts}"));
            files.forEach((value: string) => {
                require(value);
            });
        }
        return this._router;
    }

    /**对方法进行装饰注入，这是一个创建方法Mapping装饰器的函数，返回的就是一个装饰器，传入的是想要创建的装饰器的请求方法 */
    setRouter(type: ROUTER_REQUEST_TYPE) {
        return (path: string) => {
            if (path.indexOf("/") < 0) path = "/" + path;
            let methodsMap = this._routerMap.get(type);
            if (!methodsMap) throw type + " 未定义路由请求类型";
            let key = methodsMap.get(path);
            if (key) throw "注册重复key，请检查路由";
            //target是装饰的方法所在类的原型，不能直接使用new进行创建对象，需要后续在类方法上定义请求base路径的时候进行处理。
            return (target: any, funcName: string) => {
                methodsMap!.set(path, { module: target, funcName });
            }
        }
    }

    /**设置 一级key
     * 因为类的装饰器总会比方法的装饰器晚一步执行。当对类进行装饰的时候，会先去判断类的方法有没有被注入，如果有的话，那么会将类的引用放到Map的module当中，方便请求进来直接调用。
    */
    setApi(bashPath: string): ClassDecorator {
        return (target: any) => {
            if (bashPath.indexOf("/") < 0) bashPath = "/" + bashPath;
            this._routerMap.forEach((tempMap, requestType: string) => {
                tempMap.forEach((value, path) => {
                    if (target.prototype === value.module) {
                        let resultPath = bashPath + path;
                        value.module = target;
                        tempMap.set(resultPath, value);
                        tempMap.delete(path);
                        // 添加路由处理器
                        this._router[requestType as ROUTER_REQUEST_TYPE](resultPath, ...[target.prototype[value.funcName]])
                    }
                })
            })
        }
    }
}

export enum ROUTER_REQUEST_TYPE {
    POST = "post",
    GET = "get",
    PUT = "put",
    DELETE = "delete"
}
/**函数装饰器 请求方法 get*/
export const GET = RouterManager.instance().setRouter(ROUTER_REQUEST_TYPE.GET);
/**函数 请求方法 post*/
export const POST = RouterManager.instance().setRouter(ROUTER_REQUEST_TYPE.POST);
/**函数 请求方法 put*/
export const PUT = RouterManager.instance().setRouter(ROUTER_REQUEST_TYPE.PUT);
/**函数 请求方法 delete*/
export const DELETE = RouterManager.instance().setRouter(ROUTER_REQUEST_TYPE.DELETE);
/**类 一级路径 */
export const API = (basePath: string) => {
    return RouterManager.instance().setApi(basePath);
}


