"use client"

import { useFormStatus } from "react-dom"

export default function SubmitButton({ children, pendingText, className }: { children: React.ReactNode, pendingText?: string, className?: string }) {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className={`border rounded-2xl bg-gray-200 text-gray-900 px-4 py-2 disabled:opacity-50 ${className ?? ""}`}
        >
            {pending && pendingText ? pendingText : children}
        </button>
    )
}
