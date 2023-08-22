import * as userService from '@/lib/services/user.service'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export const GET = async function history(req: Request, _res: Response) {
    const { searchParams } = new URL(req.url)
    Object.entries(searchParams).forEach(async ([key, value], _index) => {
        if (key === 'user') {
            const user = await userService.getUser(value)
            if (!user) {
                return NextResponse.json(
                    { error: 'User not found' },
                    { status: 404 }
                )
            }
            const history = await userService.getUserHistory(user)
            return NextResponse.json(history, { status: 200 })
        }
    })
}
