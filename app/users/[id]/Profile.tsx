export default function Profile({ author }: { author: { name: string, email: string } }) {
    return (
        <>
            <h2 className="text-2xl">{author.name}</h2>
            <p>{author.email}</p>
        </>
    )
}
