"use client";

import { useActionState, useState } from "react";
import SubmitButton from "@/app/components/SubmitButton";
import {
  errorClass,
  formClass,
  inputClass,
  labelClass,
} from "@/app/components/formStyles";
import Profile, { avatarGradient } from "./Profile";
import { updateProfile, type ProfileFormState } from "./actions";

const initialState: ProfileFormState = {};

export default function ProfileEditor({
  author,
}: {
  author: { id: number; name: string; email: string };
}) {
  const [editing, setEditing] = useState(false);
  const [state, action] = useActionState(
    updateProfile.bind(null, author.id),
    initialState
  );
  const [handledState, setHandledState] = useState(state);

  if (state !== handledState) {
    setHandledState(state);
    if (state.updated) setEditing(false);
  }

  if (!editing) {
    return (
      <div className="flex flex-col items-center gap-6">
        <Profile author={author} />
        <button
          type="button"
          onClick={() => setEditing(true)}
          className={`rounded-full bg-gradient-to-r ${avatarGradient(author.id)} px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90`}
        >
          Edit profile
        </button>
      </div>
    );
  }

  return (
    <form action={action} className={formClass}>
      <label className="flex flex-col gap-1">
        <span className={labelClass}>Name</span>
        <input
          name="name"
          type="text"
          defaultValue={state.values?.name ?? author.name}
          className={inputClass}
        />
        {state.errors?.name && (
          <p className={errorClass}>{state.errors.name.join(" ")}</p>
        )}
      </label>

      <label className="flex flex-col gap-1">
        <span className={labelClass}>Email</span>
        <input
          name="email"
          type="email"
          defaultValue={state.values?.email ?? author.email}
          className={inputClass}
        />
        {state.errors?.email && (
          <p className={errorClass}>{state.errors.email.join(" ")}</p>
        )}
      </label>

      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="text-sm font-medium text-navy-soft transition-colors hover:text-navy"
        >
          Cancel
        </button>
        <SubmitButton pendingText="Saving…">Save</SubmitButton>
      </div>

      {state.message && (
        <p className={`${errorClass} text-center`}>{state.message}</p>
      )}
    </form>
  );
}
