"use client"

import Button from "@/app/components/Button"
import { useParams, useRouter } from "next/navigation"

export default function Page() {
    const router = useRouter()
    const { username } = useParams()

    return (
        <main>
            <h1 className="text-4xl pb-4">{username}</h1>
            <button onClick={() => router.back()} className="border rounded-2xl bg-gray-200 text-gray-900 px-4 py-2">Back</button>
            <Button href="/">Back to Home</Button>
        </main>
    )
}