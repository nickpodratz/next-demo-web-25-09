"use client";

import { useState, useTransition } from "react";
import { deletePost } from "./actions";

export default function BlogPost({
  id,
  title,
  content,
  authorName,
  canDelete,
}: {
  id: number;
  title: string;
  content: string;
  authorName?: string;
  canDelete: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleDelete() {
    startTransition(async () => {
      try {
        await deletePost(id);
        setError(null);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to delete post."
        );
      }
    });
  }

  return (
    <article className="rounded-2xl border border-navy/10 bg-surface/50 p-6">
      <h2 className="text-2xl font-semibold text-navy">{title}</h2>
      {authorName && (
        <p className="pt-1 text-sm text-navy-soft">by {authorName}</p>
      )}
      <p className="pt-4 leading-relaxed text-navy-mid">{content}</p>
      {canDelete && (
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="mt-4 rounded-full border border-red-200 px-4 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
        >
          {isPending ? "Deleting…" : "Delete"}
        </button>
      )}
      {error && <p className="pt-2 text-sm text-red-600">{error}</p>}
    </article>
  );
}
