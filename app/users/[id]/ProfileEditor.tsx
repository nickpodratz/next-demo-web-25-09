"use client"

import { useActionState, useState } from "react"
import SubmitButton from "@/app/components/SubmitButton"
import Profile, { avatarGradient } from "./Profile"
import { updateProfile, type ProfileFormState } from "./actions"

const inputClass = "w-full border rounded px-3 py-2"

const initialState: ProfileFormState = {}

export default function ProfileEditor({ author }: { author: { id: number; name: string; email: string } }) {
    const [editing, setEditing] = useState(false)
    const [state, action] = useActionState(updateProfile.bind(null, author.id), initialState)
    const [handledState, setHandledState] = useState(state)

    if (state !== handledState) {
        setHandledState(state)
        if (state.updated) setEditing(false)
    }

    if (!editing) {
        return (
            <div className="flex flex-col items-center gap-6">
                <Profile author={author} />
                <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className={`rounded-2xl bg-gradient-to-r ${avatarGradient(author.id)} px-4 py-2 text-white shadow-md hover:opacity-90`}
                >
                    Edit profile
                </button>
            </div>
        )
    }

    return (
        <form action={action} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1">
                <span className="text-sm text-gray-500">Name</span>
                <input name="name" type="text" defaultValue={state.values?.name ?? author.name} className={inputClass} />
                {state.errors?.name && <p className="text-red-600 text-sm">{state.errors.name.join(" ")}</p>}
            </label>

            <label className="flex flex-col gap-1">
                <span className="text-sm text-gray-500">Email</span>
                <input name="email" type="email" defaultValue={state.values?.email ?? author.email} className={inputClass} />
                {state.errors?.email && <p className="text-red-600 text-sm">{state.errors.email.join(" ")}</p>}
            </label>

            <div className="flex items-center justify-between pt-4">
                <button type="button" onClick={() => setEditing(false)} className="text-blue-500 hover:underline">
                    Cancel
                </button>
                <SubmitButton pendingText="Saving…">Save</SubmitButton>
            </div>

            {state.message && <p className="text-red-600 text-sm text-center">{state.message}</p>}
        </form>
    )
}
