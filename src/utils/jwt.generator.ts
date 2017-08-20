import { sign, verify } from 'jsonwebtoken'
import { Config } from '../config'

export class JWTHandler {
    static sign(payload: object): string {
        return sign(payload, Config.jwt.secret)
    }

    static parse(token: string): string | object {
        return verify(token, Config.jwt.secret)
    }
}