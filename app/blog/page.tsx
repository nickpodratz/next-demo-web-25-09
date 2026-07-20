import { createPost, getPosts } from "./actions"

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="m-16">
      <h1 className="text-6xl pb-6 pt-8">Blog</h1>

      <form action={createPost} className="flex flex-col w-200 text-left border gap-4 p-4" >
        <input name="title" placeholder="Title" />
        <textarea name="content" placeholder="Content" />
        <button type="submit">Create</button>
      </form>

      <ul className="pt-12">
        {posts.map(post => (
          <li key={post.id} className="pb-6">
            <h2 className="text-2xl">{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}