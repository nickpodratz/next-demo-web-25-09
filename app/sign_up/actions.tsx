"use server"

import { createPasswordDigest } from "@/lib/password";
import { prisma } from "@/prisma/prisma.client";
import { Author } from "./types/author";

export async function handleSignUp(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const name = formData.get("name") as string

    const author = await createAuthor({email, password, name})
}

export async function createAuthor({email, password, name}: {email: string, password: string, name: string}): Promise<Author | null> {
    try {
        const passwordDigest = await createPasswordDigest(password)

        const author = await prisma.author.create({
            data: { email, passwordDigest, name }
        })

        return author
    } catch {
        return null
    }
}
