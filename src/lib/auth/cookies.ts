import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import { verifyJWT } from './jwt'
import { UserDVO } from '../models/user.model'
import { logger } from '../logging'

export function setCookie(name: string, value: object | string): void {
    const stringValue =
        typeof value === 'object' ? `j:${JSON.stringify(value)}` : value

    cookies().set(name, stringValue, {
        sameSite: 'strict',
        httpOnly: true,
        maxAge: 3600,
        path: '/',
    })
}

export function clearCookie(name: string): void {
    cookies().delete(name)
}

export const getUserFromCookies = async (req: NextRequest) => {
    try {
        const rawUser = req.cookies.get('auth')?.value
        if (!rawUser) {
            return null
        }

        const jwtDecoded = await verifyJWT(rawUser)
        if (jwtDecoded) {
            return jwtDecoded as UserDVO
        }

        return null
    } catch (e) {
        return null
    }
}
