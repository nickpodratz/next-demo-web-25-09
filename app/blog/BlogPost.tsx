"use client"

import { useTransition } from "react"
import { deletePost } from "./actions"

export default function BlogPost({ id, title, content }: { id: number, title: string, content: string }) {
    const [isPending, startTransition] = useTransition()

    function handleDelete() {
        startTransition(async () => {
            try {
                await deletePost(id)
            } catch (error) {
                console.log(error)
            }
        })
    }

    return (
        <>
            <h2 className="text-2xl">{title}</h2>
            <p>{content}</p>
            <button onClick={handleDelete} disabled={isPending}>Delete</button>
        </>
    )
}