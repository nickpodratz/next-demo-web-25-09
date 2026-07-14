import UserForm from "./UserForm";

export async function handleSubmit(formData: FormData) {
  "use server";

  const name = formData.get("name");
  console.log("Eingegebener Name:", name);
  // Hier DB/FS/API Logik aufrufen
}
export default function Page() {
  return (
    <main>
      <UserForm onSubmit={handleSubmit} />
    </main>
  );
}