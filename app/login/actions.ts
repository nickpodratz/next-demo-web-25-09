"use server"

import { redirect, RedirectType } from "next/navigation"
import { revalidatePath } from "next/cache"
import authorService from "@/lib/author.service"
import { checkPassword, checkPasswordAgainstDecoy } from "@/lib/password"
import { createSession, destroyCurrentSession, purgeExpiredSessions } from "@/lib/session"
import { validatePresence } from "@/lib/validation"

export type LoginFormState = {
    values?: { email?: string }
    errors?: { email?: string[]; password?: string[] }
    message?: string
}

const INVALID_CREDENTIALS = "The provided credentials were incorrect."

export async function login(_prevState: LoginFormState, formData: FormData): Promise<LoginFormState> {
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")

    const errors = {
        email: validatePresence(email, "Email"),
        password: validatePresence(password, "Password"),
    }
    if (errors.email || errors.password) return { values: { email }, errors }

    const author = await authorService.findByEmailWithDigest(email)

    const ok = author ? await checkPassword(author.passwordDigest, password) : await checkPasswordAgainstDecoy(password)

    if (!author || !ok) return { values: { email }, message: INVALID_CREDENTIALS }

    await destroyCurrentSession()
    await purgeExpiredSessions()
    await createSession(author.id)

    revalidatePath("/", "layout")
    redirect(`/users/${author.id}`, RedirectType.replace)
}

export async function logout() {
    await destroyCurrentSession()
    revalidatePath("/", "layout")
    redirect("/login")
}
