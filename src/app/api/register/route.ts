import { databaseConnect } from '@/lib/db/connect'
import { passwordHash } from '@/lib/helpers/auth'
import { logger } from '@/lib/helpers/logging'
import { UserDTO } from '@/lib/models/user.model'
import {
    createUser,
    getUser,
    isValidUser,
    toUserDVO,
} from '@/lib/services/user.service'
import type { NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export const POST = async function (req: Request, res: NextApiResponse) {
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

    const hashedPass = await passwordHash('sasdasdasd')
    userCandidate.password = hashedPass
    try {
        const newUser = await createUser(userCandidate)
        if (!newUser) {
            return NextResponse.json(
                { error: 'Unknown error while creating user.' },
                { status: 500 }
            )
        }

        return NextResponse.json(toUserDVO(newUser), { status: 201 })
    } catch (e) {
        logger.error(e)
        return NextResponse.json(
            { error: 'Invalid request to create user.' },
            { status: 400 }
        )
    }
}
