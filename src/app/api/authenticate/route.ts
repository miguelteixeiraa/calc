import { databaseConnect } from '@/lib/dbConnect'
import { UserDTO } from '@/lib/models/user.model'
import * as userService from '@/lib/services/user.service'
import { NextRequest, NextResponse } from 'next/server'
import { generateJwt } from '@/lib/auth/jwt'
import { setCookie } from '@/lib/auth/cookies'
import { passwordMatch } from '@/lib/auth/password'

export const runtime = 'nodejs'

export const POST = async function authenticate(req: NextRequest) {
    // Does nothing if already connected
    await databaseConnect()

    const userAuth: UserDTO = await req.json()

    if (!userService.isValidUser(userAuth)) {
        return NextResponse.json(
            { error: 'Invalid request to authenticate user.' },
            { status: 401 }
        )
    }

    const user = await userService.getUser(userAuth.email)
    if (!user) {
        return NextResponse.json({ error: 'User not found.' }, { status: 400 })
    }

    if (!passwordMatch(user.password, userAuth.password)) {
        return NextResponse.json(
            { error: 'Invalid credentials' },
            { status: 401 }
        )
    }

    const jwt = await generateJwt(userService.toUserDVO(user))
    setCookie('auth', jwt)

    return NextResponse.json(userService.toUserDVO(user), { status: 200 })
}
