"use client";

import Link from "next/link";
import { useActionState } from "react";
import SubmitButton from "@/app/components/SubmitButton";
import { errorClass, formClass, inputClass } from "@/app/components/formStyles";
import { login, type LoginFormState } from "./actions";

const initialState: LoginFormState = {};

export default function LoginForm() {
  const [state, action] = useActionState(login, initialState);

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
          name="password"
          type="password"
          placeholder="Password"
          className={inputClass}
        />
        {state.errors?.password && (
          <p className={errorClass}>{state.errors.password.join(" ")}</p>
        )}
      </div>

      <SubmitButton pendingText="Logging in…">Login</SubmitButton>

      {state.message && <p className={errorClass}>{state.message}</p>}

      <p className="text-sm text-navy-soft">
        No account yet?{" "}
        <Link href="/sign_up" className="font-semibold text-navy hover:text-lilac">
          Sign up
        </Link>
      </p>
    </form>
  );
}
