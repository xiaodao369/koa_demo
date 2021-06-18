import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

/*
 * @Description: 账户表
 * @Author: 小道
 * @Date: 2021-06-17 09:42:54
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-18 17:24:28
 */
@Entity({ name: "Account" })
export default class AccountEntity {
    @PrimaryGeneratedColumn({ comment: "主键自增id" })
    uid?: number;
    @Column({ length: 20, comment: "用户名" })
    username?: string;
    @Column({ comment: "密码" })
    password?: string;
    @CreateDateColumn({ comment: "创建日期" })
    date?: Date;
}