import 'server-only'
import { randomBytes } from 'node:crypto'
import { cookies } from 'next/headers'
import { prisma } from '@/prisma/prisma.client'

export const SESSION_COOKIE = 'sessionId'
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7

export async function createSession(authorId: number) {
    const id = randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + SESSION_TTL_SECONDS * 1000)

    await prisma.session.create({ data: { id, authorId, expiresAt } })

    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE, id, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: SESSION_TTL_SECONDS,
    })
}

export async function destroyCurrentSession() {
    const cookieStore = await cookies()
    const id = cookieStore.get(SESSION_COOKIE)?.value
    if (id) await prisma.session.deleteMany({ where: { id } })
    cookieStore.delete(SESSION_COOKIE)
}

export async function purgeExpiredSessions() {
    await prisma.session.deleteMany({ where: { expiresAt: { lt: new Date() } } })
}
