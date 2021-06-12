import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

/*
 * @Description: 用户基础信息
 * @Autor: 小道
 * @Date: 2021-06-12 10:35:53
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-12 13:26:44
 */
@Entity()
export class UserBaseEntity{

    @PrimaryGeneratedColumn()
    uid?:number;
    @Column()
    nick?:string;
    @Column()
    sex?:number;
    @Column()
    head?:string;
    @CreateDateColumn()
    date?:Date;
}
