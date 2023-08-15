import { databaseConnect } from '@/lib/db/connect'
import { passwordMatch } from '@/lib/helpers/auth'
import { UserDTO } from '@/lib/models/user.model'
import * as userService from '@/lib/services/user.service'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export const POST = async function authenticate(
    req: NextRequest,
    res: NextResponse
) {
    // Does nothing if already connected
    await databaseConnect()

    const userAuth: UserDTO = await req.json()

    if (!userService.isValidUser(userAuth)) {
        return NextResponse.json(
            { error: 'Invalid request to authenticate user.' },
            { status: 400 }
        )
    }

    const user = await userService.getUser(userAuth.email)
    if (!user) {
        return NextResponse.json({ error: 'User not found.' }, { status: 400 })
    }

    if (!passwordMatch(user.password, userAuth.password)) {
        return NextResponse.json(
            { error: 'Invalid credentials' },
            { status: 400 }
        )
    }

    return NextResponse.json(userService.toUserDVO(user), { status: 200 })
}
