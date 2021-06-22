/*
 * @Description: token工具类
 * @Author: 小道
 * @Date: 2021-06-21 09:45:35
 * @LastEditors: 小道
 * @LastEditTime: 2021-06-22 09:56:38
 */

import jwt from "jsonwebtoken"

import * as fs from "fs";
import * as path from "path";

export class TokenUtils {

    static redis_key_token: string = "token";

    /**私钥*/;
    private static _cert_private: string = `-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEAwKfppv8SFyhstv4esw/qlRL9lmMlJ1gP4VOL31hLSrrc/E6h
En+HfXuK7NabYPnAfmHX4wjx5nCDfXO+buXXuD/gMXDE4t2MVFn89kE/vvQZHhNa
enW7xWsw4jfgGKSVJUBzkkhAfBB34aJ47fjWpzJ2MSG8BRgjukcJgtepb4mjqICj
qYEoRHMMkZzzibUZnptxvVUDV333372X6hw8yKijI5IrMXL0PaaJG6eb8dUBJWFL
qxsbf9rjDhmvYLaKo0zxeeoOCAOYW4A3P5Za1U9+HVagZhzgWnAczeEDfwp8gkM9
CEGL3IbtKOLroQH7LXQQRIXoezlG7yFlXi7uLwIDAQABAoIBAQCJ+nhsIvh433nl
IWEpS3ftpnk6MO3WHMrazTQ7FIhwEB7fEQ1pKy8Fnuqjrxv/O0AzA65Tqv9c1C5I
NhIoaLK0AgN2RVatSJENhJmYYKjgAQDQOnothI6j2J5dFjmITK+Iy306Qkb00/KY
Bf3oKbTKcGiXzZpUZ7KG4gOc0wpFl6b+oFxYg/2LkSYdCbdgjPvCw7OqfqDgcV1P
aLxBmsC9/G6nzpBCWnPQTjLqPQzFx0pvDrzlgWZn/LDLG1YWIg6/cTN27fXEps6d
jgmmXccAnaGZna74Awpepo184Z5wsuLTmJJGid1/fVwzD0RdBXUlcXGN8N/0kgE1
blW2Ig75AoGBAOTh4nDgVrxNJUULmj11SqMSRrLWcpuZR9SKV++si72/A+SDUHAI
BDOzbXu+BcAihR314x8zdsbEJCnxFhevMky4JSV2yGJDHGYA2DI1XBrxzZj/A/eT
fQleGcdsnL6dDDKUY5PExfXwP82kDuLUBPR5FZNiHuOp2MO8NWAvZnKtAoGBANd7
QwyeWVqm0EgnBGImelrMijRjVFWV+wcSUnR+0qtPZ/4/O3P7B9Iw1zcLMuqUm+lI
BOQE2lf3JvhWrgLLHKnQj7srUK6CXXvzNb5twIGTcskxJ4fSUD2Dj8fvl2H0+5dy
Kqfxb4gmPVF8ufHssbQx+AKpMoBtd/oxy6IGONvLAoGATWYdfvI+InssCUc9J19M
mAyMH9no87lH0xXdWs1MjCPWGyZUwy3SzfD1Kw09QJXr0g/eeCSdG+YkHJLMV8IF
DnCPDzY12RS8u7m5YnEs7meqkPxbyRL1C3/o08lk0AinoUsQyV2XW+2chdvetNHh
wxJXO3nI3FAJX1d77UTaLhkCgYEArh9euO2kSsqNeCB/PEjXilPKQjcZyOcfKEG3
+4cX+XJ7GEpEYp4xXbo1zrbv9/sKWeHmgdMiFP8UsIxqpLs4eEiePKLt2XZi0Gxh
u3W4n3xkvwtHZEugp3SOVQPYkkGCpIiOy5MfiydLWXOuVj3sAy51uMC8nGbZEoX2
hQD+JS0CgYEA3pRNEa+vPdgeQ8GsLrAkS+4SjKgR+EBPV3W8MLf+x+FnaGwcmLGP
2kCL2xuZvGvjTAoeIK3GC+IRai18M++CzdWudVeLIP4+9X4ZuQYjVrgY2d3QUvIL
I6J+IK8aLV2G3y0gXdoB9lLlsJGGr+EXhbBhlT8SVY5kzt7+w11/+kk=
-----END RSA PRIVATE KEY-----`;

    /**公钥 */
    private static _cert_public: string = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAwKfppv8SFyhstv4esw/qlRL9lmMlJ1gP4VOL31hLSrrc/E6hEn+H
fXuK7NabYPnAfmHX4wjx5nCDfXO+buXXuD/gMXDE4t2MVFn89kE/vvQZHhNaenW7
xWsw4jfgGKSVJUBzkkhAfBB34aJ47fjWpzJ2MSG8BRgjukcJgtepb4mjqICjqYEo
RHMMkZzzibUZnptxvVUDV333372X6hw8yKijI5IrMXL0PaaJG6eb8dUBJWFLqxsb
f9rjDhmvYLaKo0zxeeoOCAOYW4A3P5Za1U9+HVagZhzgWnAczeEDfwp8gkM9CEGL
3IbtKOLroQH7LXQQRIXoezlG7yFlXi7uLwIDAQAB
-----END RSA PUBLIC KEY-----`;

    static timeOut: number = 60 * 30

    /**获取一个token
     * @param username
     * @param uid
     */
    static getToken(username: string, uid: string) {

        let created = Math.floor(Date.now() / 1000);
        let data = { uid, username };
        let token = jwt.sign({
            data,
            exp: created + 30// * 60, //一小时过期
        }, TokenUtils._cert_private, { algorithm: 'RS256' });
        return token;
    }

    /**token验证
     * @param token
     */
    static verifyToken(token: string): { code: number, data?: { uid: string, username: string }, message?: string } {
        let res: any;
        try {
            let result: any = jwt.verify(token, this._cert_public, { algorithms: ['RS256'] }) || {};
            let { exp = 0 } = result;
            let current = Math.floor(Date.now() / 1000);
            if (current <= exp) res = { code: 0, data: result.data };
            else res = { code: 2, message: "jwt expired" };
        } catch (e) {
            console.log(JSON.stringify(e));
            res = { code: 2, message: e.message };
        }
        return res;
    }
}
