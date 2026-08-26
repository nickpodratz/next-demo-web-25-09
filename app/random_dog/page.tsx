import Image from "next/image";
import Counter from "./Counter";

type RandomDogResponse = { message: string };

export default async function DogPage() {
  const response = await fetch("https://dog.ceo/api/breeds/image/random", { cache: "no-store" });
  const { message }: RandomDogResponse = await response.json();

  return (
    <main className="p-8 text-center text-2xl">
      <h1>Random Dog</h1>
      <Image
        src={message}
        alt="Random Dog"
        width={400}
        height={400}
        className="mx-auto my-4 block h-auto max-w-full rounded-xl"
      />
      <Counter />
    </main>
  );
}
