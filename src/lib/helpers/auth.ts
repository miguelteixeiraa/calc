import * as bcrypt from 'bcrypt'
import * as jose from 'jose'
import { serialize } from 'cookie'
import { UserDVO } from '../models/user.model'
import { NextApiResponse } from 'next'

const saltRounds = 10

export async function passwordHash(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, saltRounds)
}

export async function passwordMatch(
    passwordHash: string,
    password: string
): Promise<boolean> {
    return bcrypt.compare(password, passwordHash)
}

export const COOKIE_OPTIONS = {
    httpOnly: true,
    maxAge: 2592000,
    path: '/',
    sameSite: 'Strict',
    secure: true,
}

export function setCookie(
    res: NextApiResponse,
    name: string,
    value: string,
    options: Record<string, unknown>
): void {
    const stringValue =
        typeof value === 'object' ? `j:${JSON.stringify(value)}` : String(value)

    res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}

export function clearAuth(res: NextApiResponse): void {
    setCookie(res, 'auth', '0', {
        ...COOKIE_OPTIONS,
        path: '/',
        maxAge: 1,
    })
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)
const JWT_ALG = 'HS256'

export async function generateJwt(user: UserDVO) {
    const jwt = await new jose.SignJWT({ ...user })
        .setProtectedHeader({ alg: JWT_ALG })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(JWT_SECRET)

    return jwt
}

export async function verifyJWT(
    jwt: string
): Promise<jose.JWTPayload & UserDVO> {
    const { payload } = await jose.jwtVerify(jwt, JWT_SECRET)
    return payload as jose.JWTPayload & UserDVO
}
