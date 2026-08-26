import Button from "../components/Button"
import SubmitButton from "../components/SubmitButton"
import authorService from "@/lib/author.service"

const inputClass = "border rounded px-3 py-2"

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
    const { q } = await searchParams
    const query = typeof q === "string" ? q.trim() : ""
    const authors = await authorService.search(query)

    return (
        <section>
            <h1 className="pb-6 text-4xl font-bold tracking-tight">Users</h1>

            <form action="/users" method="get" className="flex gap-2">
                <input name="q" defaultValue={query} placeholder="Search by name or email" className={inputClass} />
                <SubmitButton>Search</SubmitButton>
            </form>

            <ul className="pt-8 flex flex-col gap-2">
                {authors.map(author => (
                    <li key={author.id}>
                        <Button href={`/users/${author.id}`}>{author.name}</Button>{" "}
                        <span className="text-gray-500">{author.email}</span>
                    </li>
                ))}
            </ul>

            {authors.length === 0 && <p className="pt-8">No users match &ldquo;{query}&rdquo;.</p>}
        </section>
    )
}
