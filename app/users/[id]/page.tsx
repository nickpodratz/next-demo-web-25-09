import { notFound } from "next/navigation"
import Button from "@/app/components/Button"
import authorService from "@/lib/author.service"
import Profile from "./Profile"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const authorId = Number(id)
    if (!Number.isInteger(authorId) || authorId <= 0) notFound()

    const author = await authorService.findById(authorId)
    if (!author) notFound()

    return (
        <section>
            <Profile author={author} />
            <Button href="/users">Back to Users</Button>
            <Button href="/">Back to Home</Button>
        </section>
    )
}
