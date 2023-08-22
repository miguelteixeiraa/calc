import { clearCookie } from '@/lib/auth/cookies'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export const GET = async function logout(_req: NextRequest) {
    clearCookie('auth')
    return NextResponse.json({}, { status: 200 })
}
