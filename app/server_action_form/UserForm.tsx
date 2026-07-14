"use client";

export default function UserForm({ onSubmit }: { onSubmit: (formData: FormData) => void }) {
  return (
    <form action={onSubmit}>
    <input name="name" placeholder="Name" required />
    <button type="submit" >Absenden</button>
    </form>
  );
}