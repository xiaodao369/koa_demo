import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

/*
 * @Description: 用户基础信息表
 * @Autor: 小道
 * @Date: 2021-06-12 10:35:53
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-18 17:44:41
 */
@Entity({ name: "UserBase" })
export class UserBaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;
    @Column({ comment: "uid" })
    uid?: number;
    @Column({ length: 100, comment: "名称" })
    nick?: string;
    @Column({ comment: "性别" })
    sex?: number;
    @Column({ comment: "头像" })
    head?: string;
    @CreateDateColumn({ comment: "注册日期" })
    date?: Date;
}
