"use client"

import Button from "@/app/components/Button"
import { useParams } from "next/navigation"

export default function Page() {
    const { username } = useParams()

    return (
        <main>
            <h1 className="text-4xl pb-4">{username}</h1>
            <Button href="/">Back to Home</Button>
        </main>
    )
}