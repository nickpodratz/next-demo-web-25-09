import Link from "next/link"
import { createPost } from "./actions"
import BlogPost from "./BlogPost";
import postService from "./service";
import { getCurrentUser } from "@/lib/auth";

export default async function BlogPage() {
  const [posts, user] = await Promise.all([postService.getAll(), getCurrentUser()])

  return (
    <section>
      <h1 className="pb-6 text-4xl font-bold tracking-tight">Blog</h1>

      {user ? (
        <form action={createPost} className="flex flex-col w-200 text-left border gap-4 p-4" >
          <input name="title" placeholder="Title" />
          <textarea name="content" placeholder="Content" />
          <button type="submit">Create</button>
        </form>
      ) : (
        <p>You must <Link href="/login" className="text-blue-500 hover:underline">log in</Link> to create a post.</p>
      )}

      <ul className="pt-12">
        {posts.map(post => (
          <li key={post.id} className="pb-6">
            <BlogPost {...post} authorName={post.author?.name} canDelete={post.authorId === user?.id} />
          </li>
        ))}
      </ul>
    </section>
  )
}
