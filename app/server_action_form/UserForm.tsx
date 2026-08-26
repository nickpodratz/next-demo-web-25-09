"use client";

export default function UserForm({ submitAction }: { submitAction: (formData: FormData) => void }) {
  return (
    <form action={submitAction}>
      <input name="name" placeholder="Name" required />
      <button type="submit">Absenden</button>
    </form>
  );
}
