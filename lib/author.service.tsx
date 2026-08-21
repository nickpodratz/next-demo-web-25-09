import 'server-only'
import { Prisma } from '@prisma/client'
import { prisma } from '@/prisma/prisma.client'
import { createPasswordDigest } from './password'

const normalizeEmail = (email: string) => email.trim().toLowerCase()

async function createAuthor({ email, password, name }: { email: string; password: string; name: string }) {
    return prisma.author.create({
        data: {
            email: normalizeEmail(email),
            name: name.trim(),
            passwordDigest: await createPasswordDigest(password),
        },
        select: { id: true, name: true, email: true },
    })
}

async function findByEmailWithDigest(email: string) {
    return prisma.author.findUnique({
        where: { email: normalizeEmail(email) },
        select: { id: true, passwordDigest: true },
    })
}

async function findById(id: number) {
    return prisma.author.findUnique({
        where: { id },
        select: { id: true, name: true, email: true },
    })
}

async function searchAuthors(query: string) {
    return prisma.author.findMany({
        where: query
            ? {
                  OR: [
                      { name: { contains: query, mode: 'insensitive' } },
                      { email: { contains: query, mode: 'insensitive' } },
                  ],
              }
            : undefined,
        select: { id: true, name: true, email: true },
        orderBy: { name: 'asc' },
        take: 50,
    })
}

export function isDuplicateEmailError(error: unknown) {
    if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== 'P2002') return false

    const meta = error.meta as {
        target?: string[]
        driverAdapterError?: { cause?: { constraint?: { fields?: string[] } } }
    } | undefined

    const fields = meta?.driverAdapterError?.cause?.constraint?.fields ?? meta?.target
    return fields?.includes('email') ?? false
}

const authorService = {
    create: createAuthor,
    findByEmailWithDigest,
    findById,
    search: searchAuthors,
}

export default authorService
