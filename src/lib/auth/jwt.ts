import * as jwt from 'jose'
import { UserDVO } from '../models/user.model'
import { logger } from '../logging'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string)
const JWT_ALG = 'HS256'

export async function generateJwt(user: UserDVO) {
    const token = await new jwt.SignJWT(user as jwt.JWTPayload & UserDVO)
        .setProtectedHeader({ alg: JWT_ALG })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(JWT_SECRET)

    return token
}

export async function verifyJWT(token: string | undefined) {
    try {
        const { payload } = await jwt.jwtVerify(token || '', JWT_SECRET)
        return payload as UserDVO & jwt.JWTPayload
    } catch (e) {
        return null
    }
}
