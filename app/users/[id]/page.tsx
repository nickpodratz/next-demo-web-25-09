import { notFound } from "next/navigation"
import Button from "@/app/components/Button"
import authorService from "@/lib/author.service"
import { getCurrentUser } from "@/lib/auth"
import Profile, { avatarGradient, pageGradient } from "./Profile"
import ProfileEditor from "./ProfileEditor"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const authorId = Number(id)
    if (!Number.isInteger(authorId) || authorId <= 0) notFound()

    const author = await authorService.findById(authorId)
    if (!author) notFound()

    const currentUser = await getCurrentUser()
    const isOwnProfile = currentUser?.id === author.id

    return (
        <main className={`flex flex-1 flex-col items-center justify-center gap-6 p-8 bg-gradient-to-br via-transparent ${pageGradient(author.id)}`}>
            <div className="w-full max-w-md rounded-2xl border bg-background/70 p-8 shadow-sm backdrop-blur-sm">
                <h1 className={`pb-8 text-center text-3xl font-semibold bg-gradient-to-r ${avatarGradient(author.id)} bg-clip-text text-transparent`}>Profile</h1>
                {isOwnProfile ? <ProfileEditor author={author} /> : <Profile author={author} />}
            </div>
            <div className="flex gap-4">
                <Button href="/users">Back to Users</Button>
                <Button href="/">Back to Home</Button>
            </div>
        </main>
    )
}
