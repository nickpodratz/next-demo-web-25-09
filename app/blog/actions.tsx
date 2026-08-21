"use server"

import { revalidatePath } from "next/cache"
import { requireUser } from "@/lib/auth"
import postService from "./service"

export async function createPost(formData: FormData) {
  const user = await requireUser()

  const title = String(formData.get("title") ?? "").trim()
  const content = String(formData.get("content") ?? "").trim()
  if (!title || !content) throw new Error("Title and content are required.")

  await postService.create(title, content, user.id)

  revalidatePath("/blog")
}

export async function deletePost(id: number) {
    const user = await requireUser()
    if (!Number.isInteger(id)) throw new Error("Invalid post id.")

    const post = await postService.find(id)
    if (!post) throw new Error("Post not found.")
    if (post.authorId !== user.id) throw new Error("Forbidden")

    await postService.delete(id)

    revalidatePath("/blog")
}
