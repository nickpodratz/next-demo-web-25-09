"use server";

export async function handleSubmit(formData: FormData) {
  const name = formData.get("name");
  console.log("Eingegebener Name:", name);
  // Hier DB/FS/API Logik aufrufen
}
