"use server"

import { revalidatePath } from "next/cache"
import authorService, { isDuplicateEmailError } from "@/lib/author.service"
import { getCurrentUser } from "@/lib/auth"
import { validateEmail, validateName } from "@/lib/validation"

export type ProfileFormState = {
    values?: { name?: string; email?: string }
    errors?: { name?: string[]; email?: string[] }
    message?: string
    updated?: boolean
}

export async function updateProfile(profileId: number, _prevState: ProfileFormState, formData: FormData): Promise<ProfileFormState> {
    const user = await getCurrentUser()
    if (!user || user.id !== profileId) {
        return { message: "You are not allowed to edit this profile." }
    }

    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()

    const errors = {
        name: validateName(name),
        email: validateEmail(email),
    }
    if (errors.name || errors.email) {
        return { values: { name, email }, errors }
    }

    try {
        await authorService.update(user.id, { name, email })
    } catch (error) {
        if (isDuplicateEmailError(error)) {
            return { values: { name, email }, errors: { email: ["That email address is already taken."] } }
        }
        console.error(error)
        return { values: { name, email }, message: "An error occurred while updating your profile." }
    }

    revalidatePath("/", "layout")
    return { updated: true }
}
