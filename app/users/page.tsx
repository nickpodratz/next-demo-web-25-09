"use client"

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [query, setQuery] = useState(searchParams.get("q") ?? "")

    function handleSubmit() {
        router.replace(`/users?q=${query}`)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                name="q" 
                placeholder="Username to search" 
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
            />
            <input type="submit" value="Senden" />
        </form>
    )
}