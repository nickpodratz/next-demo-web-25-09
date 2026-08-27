"use client";

import { useState } from "react";
import Link from "next/link";
import { createComment } from "./actions";
import SubmitButton from "../components/SubmitButton";
import { errorClass, textareaClass } from "../components/formStyles";

export type CommentData = {
  id: number;
  content: string;
  createdAt: string;
  authorName?: string;
};

export default function CommentSection({
  postId,
  comments,
  canComment,
}: {
  postId: number;
  comments: CommentData[];
  canComment: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    try {
      await createComment(postId, formData);
      setError(null);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to add comment."
      );
    }
  }

  return (
    <div className="mt-4 border-t border-navy/10 pt-4">
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-full border border-navy/10 px-4 py-1.5 text-sm font-medium text-navy transition-colors hover:border-lilac hover:text-lilac"
      >
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M3 6l5 5 5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Comments ({comments.length})
      </button>

      {open && (
        <div className="pt-4">
          {comments.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {comments.map(comment => (
                <li
                  key={comment.id}
                  className="rounded-xl bg-surface/70 px-4 py-3"
                >
                  <p className="text-sm font-medium text-navy">
                    {comment.authorName ?? "Anonymous"}
                    <span className="pl-2 font-normal text-navy-soft">
                      {comment.createdAt}
                    </span>
                  </p>
                  <p className="pt-1 leading-relaxed text-navy-mid">
                    {comment.content}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-navy-soft">
              No comments yet. Be the first to share your thoughts.
            </p>
          )}

          {canComment ? (
            <form action={handleSubmit} className="flex flex-col gap-3 pt-4">
              <textarea
                name="content"
                required
                placeholder="Write a comment…"
                aria-label="Write a comment"
                className={`${textareaClass} min-h-20`}
              />
              <div className="flex items-center gap-4">
                <SubmitButton pendingText="Posting…">Post comment</SubmitButton>
                {error && <p className={errorClass}>{error}</p>}
              </div>
            </form>
          ) : (
            <p className="pt-4 text-sm text-navy-soft">
              <Link
                href="/login"
                className="font-semibold text-navy hover:text-lilac"
              >
                Log in
              </Link>{" "}
              to join the discussion.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
