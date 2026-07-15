"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
    const router = useRouter()
    const [error, setError] = useState(false)

    async function handleSubmit(formData: FormData) {
        const email = formData.get("email")
        const password = formData.get("password")

        if (email === "test" && password === "1234") {
            router.replace("/random_dog")
            setError(false)
        } else {
            setError(true)
        }
    }

    return (
        <form action={handleSubmit}>
            <input name="email" type="text" placeholder="email"/>
            <input name="password" type="password" placeholder="password"/>
            <input type="submit" value="Login"/>
            { error && <div>The credentials were wrong; tip: test and 1234</div> }
        </form>
    )
}