"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.API = exports.DELETE = exports.PUT = exports.POST = exports.GET = exports.ROUTER_REQUEST_TYPE = exports.RouterManager = void 0;
/*
 * @Description: 路由管理
 * @Author: 小道
 * @Date: 2021-06-10 10:16:19
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-10 18:18:08
 */
var path_1 = require("path");
var BaseSingle_1 = require("../base/BaseSingle");
var koa_router_1 = require("koa-router");
var glob = require("glob");
var RouterManager = /** @class */ (function (_super) {
    __extends(RouterManager, _super);
    function RouterManager() {
        var _this = _super.call(this) || this;
        _this._apiPath = "app/game/api";
        _this._isInit = true;
        _this._routerMap = new Map();
        _this._postMap = new Map();
        _this._getMap = new Map();
        _this._putMap = new Map();
        _this._deleteMap = new Map();
        _this._routerMap.set(ROUTER_REQUEST_TYPE.POST, _this._postMap);
        _this._routerMap.set(ROUTER_REQUEST_TYPE.GET, _this._getMap);
        _this._routerMap.set(ROUTER_REQUEST_TYPE.PUT, _this._putMap);
        _this._routerMap.set(ROUTER_REQUEST_TYPE.DELETE, _this._deleteMap);
        _this._router = new koa_router_1["default"]();
        return _this;
    }
    /**路由注入
     * @param apiDirPath api路径
     * @param force 强制更新
     */
    RouterManager.prototype.init = function (apiDirPath, force) {
        if (this._isInit || force) {
            this._isInit = false;
            // 进行引用目标文件夹中的所有子ts文件，全部导入内存的同时会进行装饰，对请求Map进行填充
            var files = glob.sync(path_1.resolve(apiDirPath + "/*.{js,ts}"));
            console.log("files", files);
            files.forEach(function (value) {
                require(value);
            });
        }
        return this._router;
    };
    /**对方法进行装饰注入，这是一个创建方法Mapping装饰器的函数，返回的就是一个装饰器，传入的是想要创建的装饰器的请求方法 */
    RouterManager.prototype.setRouter = function (type) {
        var _this = this;
        return function (path) {
            console.log("路由二级key注册。。。。。。");
            if (path.indexOf("/") < 0)
                path = "/" + path;
            var methodsMap = _this._routerMap.get(type);
            if (!methodsMap)
                throw type + " 未定义路由请求类型";
            var key = methodsMap.get(path);
            if (key)
                throw "注册重复key，请检查路由";
            //target是装饰的方法所在类的原型，不能直接使用new进行创建对象，需要后续在类方法上定义请求base路径的时候进行处理。
            return function (target, funcName) {
                methodsMap.set(path, { module: target, funcName: funcName });
            };
        };
    };
    /**设置 一级key
     * 因为类的装饰器总会比方法的装饰器晚一步执行。当对类进行装饰的时候，会先去判断类的方法有没有被注入，如果有的话，那么会将类的引用放到Map的module当中，方便请求进来直接调用。
    */
    RouterManager.prototype.setApi = function (bashPath) {
        var _this = this;
        return function (target) {
            if (bashPath.indexOf("/") < 0)
                bashPath = "/" + bashPath;
            _this._routerMap.forEach(function (tempMap, requestType) {
                tempMap.forEach(function (value, path) {
                    var _a;
                    if (target.prototype === value.module) {
                        var resultPath = bashPath + path;
                        value.module = target;
                        tempMap.set(resultPath, value);
                        tempMap["delete"](path);
                        // 添加路由处理器
                        (_a = _this._router)[requestType].apply(_a, __spreadArray([resultPath], [target.prototype[value.funcName]]));
                    }
                });
            });
        };
    };
    return RouterManager;
}(BaseSingle_1.BaseSingle));
exports.RouterManager = RouterManager;
var ROUTER_REQUEST_TYPE;
(function (ROUTER_REQUEST_TYPE) {
    ROUTER_REQUEST_TYPE["POST"] = "post";
    ROUTER_REQUEST_TYPE["GET"] = "get";
    ROUTER_REQUEST_TYPE["PUT"] = "put";
    ROUTER_REQUEST_TYPE["DELETE"] = "delete";
})(ROUTER_REQUEST_TYPE = exports.ROUTER_REQUEST_TYPE || (exports.ROUTER_REQUEST_TYPE = {}));
/**函数装饰器 请求方法 get*/
exports.GET = RouterManager.instance().setRouter(ROUTER_REQUEST_TYPE.GET);
/**函数 请求方法 post*/
exports.POST = RouterManager.instance().setRouter(ROUTER_REQUEST_TYPE.POST);
/**函数 请求方法 put*/
exports.PUT = RouterManager.instance().setRouter(ROUTER_REQUEST_TYPE.PUT);
/**函数 请求方法 delete*/
exports.DELETE = RouterManager.instance().setRouter(ROUTER_REQUEST_TYPE.DELETE);
/**类 一级路径 */
var API = function (basePath) {
    return RouterManager.instance().setApi(basePath);
};
exports.API = API;
