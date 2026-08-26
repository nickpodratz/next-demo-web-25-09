"use server"

import { redirect, RedirectType } from "next/navigation"
import { revalidatePath } from "next/cache"
import authorService, { isDuplicateEmailError } from "@/lib/author.service"
import { createSession } from "@/lib/session"
import { validateEmail, validateName, validateNewPassword } from "@/lib/validation"

export type SignUpFormState = {
    values?: { email?: string; name?: string }
    errors?: { email?: string[]; name?: string[]; password?: string[] }
    message?: string
}

export async function signUp(_prevState: SignUpFormState, formData: FormData): Promise<SignUpFormState> {
    const email = String(formData.get("email") ?? "").trim()
    const name = String(formData.get("name") ?? "").trim()
    const password = String(formData.get("password") ?? "")

    const errors = {
        email: validateEmail(email),
        name: validateName(name),
        password: validateNewPassword(password),
    }
    if (errors.email || errors.name || errors.password) {
        return { values: { email, name }, errors }
    }

    let author
    try {
        author = await authorService.create({ email, name, password })
    } catch (error) {
        if (isDuplicateEmailError(error)) {
            return { values: { email, name }, errors: { email: ["That email address is already taken."] } }
        }
        console.error(error)
        return { values: { email, name }, message: "An error occurred while creating your account." }
    }

    await createSession(author.id)

    revalidatePath("/", "layout")
    redirect(`/users/${author.id}`, RedirectType.replace)
}
