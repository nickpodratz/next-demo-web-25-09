"use client";

import { useFormStatus } from "react-dom";

const baseClass =
  "inline-flex items-center justify-center rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-soft disabled:cursor-not-allowed disabled:opacity-50";

export default function SubmitButton({
  children,
  pendingText,
  className,
}: {
  children: React.ReactNode;
  pendingText?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${baseClass} ${className ?? ""}`}
    >
      {pending && pendingText ? pendingText : children}
    </button>
  );
}
