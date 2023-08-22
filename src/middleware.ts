import { NextRequest, NextResponse } from 'next/server'
import { logger } from './lib/logging'
import { getUserFromCookies } from './lib/auth/cookies'

const refreshAuthCookie = (request: NextResponse) => {
    const authCookie = request.cookies.get('auth')?.value
    if (authCookie) {
        request.cookies.set('auth', authCookie as string)
    }
}

export async function middleware(request: NextRequest) {
    const nextReq = NextResponse.next()

    const loggedUser = await getUserFromCookies(request)
    if (loggedUser) {
        refreshAuthCookie(nextReq)
    }

    if (request.nextUrl.pathname === '/profile' && !loggedUser) {
        request.nextUrl.pathname = '/login'
        return NextResponse.redirect(request.nextUrl)
    }

    if (request.nextUrl.pathname === '/login' && loggedUser) {
        request.nextUrl.pathname = '/profile'
        return NextResponse.redirect(request.nextUrl)
    }

    return nextReq
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/:path*',
}
