"use client";

import Link from "next/link";
import { useActionState } from "react";
import SubmitButton from "@/app/components/SubmitButton";
import { errorClass, formClass, inputClass } from "@/app/components/formStyles";
import { signUp, type SignUpFormState } from "./actions";

const initialState: SignUpFormState = {};

export default function SignUpForm() {
  const [state, action] = useActionState(signUp, initialState);

  return (
    <form action={action} className={`${formClass} max-w-md`}>
      <div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={state.values?.email ?? ""}
          className={inputClass}
        />
        {state.errors?.email && (
          <p className={errorClass}>{state.errors.email.join(" ")}</p>
        )}
      </div>

      <div>
        <input
          name="name"
          type="text"
          placeholder="Name"
          defaultValue={state.values?.name ?? ""}
          className={inputClass}
        />
        {state.errors?.name && (
          <p className={errorClass}>{state.errors.name.join(" ")}</p>
        )}
      </div>

      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          className={inputClass}
        />
        {state.errors?.password && (
          <ul className={errorClass}>
            {state.errors.password.map(error => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        )}
      </div>

      <SubmitButton pendingText="Signing up…">Sign up</SubmitButton>

      {state.message && <p className={errorClass}>{state.message}</p>}

      <p className="text-sm text-navy-soft">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-navy hover:text-lilac">
          Login
        </Link>
      </p>
    </form>
  );
}
