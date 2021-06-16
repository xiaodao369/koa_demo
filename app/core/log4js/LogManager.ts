/*
 * @Description: 日志中间件
 * @Author: 小道
 * @Date: 2021-06-15 11:27:07
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-16 11:57:00
 */

import * as log4js from "log4js";
import AppConfig from "../../../config/AppConfig";
import BaseSingle from "../base/BaseSingle";



export class LogManager extends BaseSingle {

    private _logger: log4js.Logger;
    private _redisLog: log4js.Logger;
    private _mysqlLog: log4js.Logger;
    private _httpLog: log4js.Logger;

    constructor() {
        super();
        log4js.configure({
            appenders: {
                logFile: {
                    type: "dateFile",
                    filename: "./logs/log",
                    pattern: 'yyyy-MM-dd-hh.log',
                    alwaysIncludePattern: true,
                    encoding: "utf-8",
                    maxSize: 11024,
                },
                console: {
                    type: "console"
                },
            },
            categories: {
                default: { appenders: ["logFile", "console"], level: AppConfig.log4jsLevel },
            },
            pm2: !AppConfig.development
        });
        this._logger = log4js.getLogger("console");
        this._redisLog = log4js.getLogger("redis");
        this._mysqlLog = log4js.getLogger("mysql");
        this._httpLog = log4js.getLogger("koa");
    }

    get logger(): log4js.Logger {
        return this._logger;
    }

    get redisLog(): log4js.Logger {
        return this._redisLog;
    }

    get mysqlLog(): log4js.Logger {
        return this._mysqlLog;
    }

    get httpLog(): log4js.Logger {
        return this._httpLog;
    }

    httpAnalysis(): void {

    }
}

export enum Log4jsLevel {
    ALL = "all",
    TRACE = "trace",
    DEBUG = "debug",
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
    FATAL = "fatal",
    OFF = "off",
}

