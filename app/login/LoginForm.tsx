"use client"

import { useActionState } from "react"
import SubmitButton from "@/app/components/SubmitButton"
import { login, type LoginFormState } from "./actions"

const inputClass = "border rounded px-3 py-2"

const initialState: LoginFormState = {}

export default function LoginForm() {
    const [state, action] = useActionState(login, initialState)

    return (
        <form action={action} className="flex flex-col gap-4 w-96">
            <div>
                <input name="email" type="email" placeholder="email" defaultValue={state.values?.email ?? ""} className={inputClass} />
                {state.errors?.email && <p className="text-red-600 text-sm">{state.errors.email.join(" ")}</p>}
            </div>

            <div>
                <input name="password" type="password" placeholder="password" className={inputClass} />
                {state.errors?.password && <p className="text-red-600 text-sm">{state.errors.password.join(" ")}</p>}
            </div>

            <SubmitButton pendingText="Logging in…">Login</SubmitButton>

            {state.message && <p className="text-red-600 text-sm">{state.message}</p>}
        </form>
    )
}
