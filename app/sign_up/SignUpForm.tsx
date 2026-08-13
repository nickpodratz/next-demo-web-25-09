"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createAuthor, handleSignUp } from "./actions";

export default function SignUpForm() {
    const router = useRouter()
    const [error, setError] = useState(false)

    return (
        <form action={handleSignUp}>
            <input name="email" type="email" placeholder="email"/>
            <input name="password" type="password" placeholder="password"/>
            <input name="name" type="text" placeholder="name"/>
            <input type="submit" value="Sign up"/>
            { error && <div>The credentials were wrong; tip: password=1234</div> }
        </form>
    )
}