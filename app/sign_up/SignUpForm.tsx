"use client"

import { useActionState } from "react"
import SubmitButton from "@/app/components/SubmitButton"
import { signUp, type SignUpFormState } from "./actions"

const inputClass = "border rounded px-3 py-2"

const initialState: SignUpFormState = {}

export default function SignUpForm() {
    const [state, action] = useActionState(signUp, initialState)

    return (
        <form action={action} className="flex flex-col gap-4 w-96">
            <div>
                <input name="email" type="email" placeholder="email" defaultValue={state.values?.email ?? ""} className={inputClass} />
                {state.errors?.email && <p className="text-red-600 text-sm">{state.errors.email.join(" ")}</p>}
            </div>

            <div>
                <input name="name" type="text" placeholder="name" defaultValue={state.values?.name ?? ""} className={inputClass} />
                {state.errors?.name && <p className="text-red-600 text-sm">{state.errors.name.join(" ")}</p>}
            </div>

            <div>
                <input name="password" type="password" placeholder="password" className={inputClass} />
                {state.errors?.password && (
                    <ul className="text-red-600 text-sm">
                        {state.errors.password.map((error) => (
                            <li key={error}>- {error}</li>
                        ))}
                    </ul>
                )}
            </div>

            <SubmitButton pendingText="Signing up…">Sign up</SubmitButton>

            {state.message && <p className="text-red-600 text-sm">{state.message}</p>}
        </form>
    )
}
