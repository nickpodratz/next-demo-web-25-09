import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { prisma } from '@/prisma/prisma.client'
import { SESSION_COOKIE } from './session'

export type CurrentUser = { id: number; name: string; email: string }

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
    const id = (await cookies()).get(SESSION_COOKIE)?.value
    if (!id) return null

    const session = await prisma.session.findFirst({
        where: { id, expiresAt: { gt: new Date() } },
        select: { author: { select: { id: true, name: true, email: true } } },
    })

    return session?.author ?? null
})

export async function requireUser(): Promise<CurrentUser> {
    const user = await getCurrentUser()
    if (!user) throw new Error('Unauthorized')
    return user
}
