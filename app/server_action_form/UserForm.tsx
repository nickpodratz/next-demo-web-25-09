"use client";

import SubmitButton from "@/app/components/SubmitButton";
import { formClass, inputClass } from "@/app/components/formStyles";

export default function UserForm({
  submitAction,
}: {
  submitAction: (formData: FormData) => void;
}) {
  return (
    <form action={submitAction} className={`${formClass} max-w-md`}>
      <input name="name" placeholder="Name" required className={inputClass} />
      <SubmitButton>Submit</SubmitButton>
    </form>
  );
}
