"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
    const router = useRouter()
    const [error, setError] = useState(false)

    async function handleSubmit(formData: FormData) {
        const username = formData.get("username")
        const password = formData.get("password")

        if (password === "1234") {
            router.replace(`/users/${username}`)
            setError(false)
        } else {
            setError(true)
        }
    }

    return (
        <form action={handleSubmit}>
            <input name="username" type="text" placeholder="username"/>
            <input name="password" type="password" placeholder="password"/>
            <input type="submit" value="Login"/>
            { error && <div>The credentials were wrong; tip: password=1234</div> }
        </form>
    )
}