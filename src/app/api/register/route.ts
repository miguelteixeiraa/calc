import { passwordHash } from '@/lib/auth/password'
import { databaseConnect } from '@/lib/dbConnect'
import { logger } from '@/lib/logging'
import { UserDTO } from '@/lib/models/user.model'
import { createUser, getUser, isValidUser } from '@/lib/services/user.service'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export const POST = async function (req: Request, _res: Response) {
    // Does nothing if already connected
    await databaseConnect()

    const userCandidate: UserDTO = await req.json()

    if (!isValidUser(userCandidate)) {
        return NextResponse.json(
            { error: 'Invalid request to create user.' },
            { status: 400 }
        )
    }

    const user = await getUser(userCandidate.email)
    if (user) {
        return NextResponse.json(
            { error: 'User already exists.' },
            { status: 400 }
        )
    }

    const hashedPass = await passwordHash(userCandidate.password)
    userCandidate.password = hashedPass
    try {
        const newUser = await createUser(userCandidate)
        if (!newUser) {
            return NextResponse.json(
                { error: 'Unknown error while creating user.' },
                { status: 500 }
            )
        }

        return NextResponse.json({ status: 201 })
    } catch (e) {
        logger.error(e)
        return NextResponse.json(
            { error: 'Invalid request to create user.' },
            { status: 400 }
        )
    }
}
