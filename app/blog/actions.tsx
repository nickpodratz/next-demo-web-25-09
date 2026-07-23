"use server"

import { revalidatePath } from "next/cache"
import postService from "./service"

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string
  const content = formData.get("content") as string

  await postService.create(title, content)

  revalidatePath("/blog")
}

export async function deletePost(id: number) {
    await postService.delete(id)

    revalidatePath("/blog")
}