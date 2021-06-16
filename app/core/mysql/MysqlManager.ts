/*
 * @Description: mysql 管理类
 * @Autor: 小道
 * @Date: 2021-06-11 21:38:54
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-15 18:00:59
 */

import * as log4js from "log4js";
import { createConnection, Logger, QueryRunner } from "typeorm";
import AppConfig from "../../../config/AppConfig";
import BaseSingle from "../base/BaseSingle";
import { LogManager } from "../log4js/LogManager";

export default class MysqlManager extends BaseSingle {

    constructor() {
        super();
    }

    /**连接mysql
     * @param entityPath entity实体路径
     */
    async init(entityPath: string) {
        let options: any = AppConfig.development == true ? AppConfig.debug.mysql : AppConfig.release.mysql;
        // options.synchronize = true;
        options.entities = [entityPath + "/*.js"]
        if (AppConfig.development) {
            options.logger = new MysqlLogger();
        }
        return createConnection(options)
    }
}

class MysqlLogger implements Logger {

    private _logger: log4js.Logger = LogManager.instance().mysqlLog;
    /**
      * Logs query and parameters used in it.
      */
    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        this._logger.info(query);
    }
    /**
     * Logs query that is failed.
     */
    logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        this._logger.info(error);
    }
    /**
     * Logs query that is slow.
     */
    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        this._logger.info(time + " | " + query);
    }
    /**
     * Logs events from the schema build process.
     */
    logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
        this._logger.info(message);
    }
    /**
     * Logs events from the migrations run process.
     */
    logMigration(message: string, queryRunner?: QueryRunner): any {
        this._logger.info(message);
    }
    /**
     * Perform logging using given logger, or by default to the console.
     * Log has its own level and message.
     */
    log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner): any {
        this._logger[level](message);
    }
}
