import Link from "next/link";
import PageShell from "../components/PageShell";
import { createPost } from "./actions";
import BlogPost from "./BlogPost";
import postService from "./service";
import { getCurrentUser } from "@/lib/auth";
import SubmitButton from "../components/SubmitButton";
import { formClass, inputClass, textareaClass } from "../components/formStyles";

export default async function BlogPage() {
  const [posts, user] = await Promise.all([
    postService.getAll(),
    getCurrentUser(),
  ]);

  return (
    <PageShell
      title="Blog"
      description="Read posts from the community or share your own when signed in."
    >
      {user ? (
        <form action={createPost} className={`${formClass} max-w-2xl border-b border-navy/10 pb-8`}>
          <input name="title" placeholder="Title" className={inputClass} />
          <textarea name="content" placeholder="Content" className={textareaClass} />
          <SubmitButton pendingText="Creating…">Create post</SubmitButton>
        </form>
      ) : (
        <p className="border-b border-navy/10 pb-8 text-navy-soft">
          You must{" "}
          <Link href="/login" className="font-semibold text-navy hover:text-lilac">
            log in
          </Link>{" "}
          to create a post.
        </p>
      )}

      <ul className="flex flex-col gap-6 pt-8">
        {posts.map(post => (
          <li key={post.id}>
            <BlogPost
              id={post.id}
              title={post.title}
              content={post.content}
              authorName={post.author?.name}
              canDelete={post.authorId === user?.id}
              canComment={!!user}
              comments={post.comments.map(comment => ({
                id: comment.id,
                content: comment.content,
                createdAt: comment.createdAt.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }),
                authorName: comment.author?.name ?? undefined,
              }))}
            />
          </li>
        ))}
      </ul>

      {posts.length === 0 && (
        <p className="pt-8 text-center text-navy-soft">No posts yet. Be the first to write one.</p>
      )}
    </PageShell>
  );
}
