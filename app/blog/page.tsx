import { createPost } from "./actions"
import { prisma } from "@/prisma/prisma.client"

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <main>
      <h1>Blog</h1>

      <form action={createPost}>
        <input name="title" placeholder="Title" />
        <textarea name="content" placeholder="Content" />
        <button type="submit">Create</button>
      </form>

      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}