"use client"

import { useState, useTransition } from "react"
import { deletePost } from "./actions"

export default function BlogPost({ id, title, content, authorName, canDelete }: { id: number, title: string, content: string, authorName?: string, canDelete: boolean }) {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)

    function handleDelete() {
        startTransition(async () => {
            try {
                await deletePost(id)
                setError(null)
            } catch (error) {
                setError(error instanceof Error ? error.message : "Failed to delete post.")
            }
        })
    }

    return (
        <div className="border rounded-xl p-4">
            <h2 className="text-2xl">{title}</h2>
            {authorName && <p className="text-sm text-gray-500">by {authorName}</p>}
            <p>{content}</p>
            {canDelete && <button onClick={handleDelete} disabled={isPending}>Delete</button>}
            {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
    )
}
