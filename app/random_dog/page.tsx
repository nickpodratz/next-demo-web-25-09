import Image from "next/image";
import PageShell from "../components/PageShell";
import Counter from "./Counter";

type RandomDogResponse = { message: string };

export default async function DogPage() {
  const response = await fetch("https://dog.ceo/api/breeds/image/random", {
    cache: "no-store",
  });
  const { message }: RandomDogResponse = await response.json();

  return (
    <PageShell
      title="Random Dog"
      description="Fetch a random dog image on every page load."
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <Image
          src={message}
          alt="Random Dog"
          width={400}
          height={400}
          className="mx-auto block h-auto max-w-full rounded-2xl border border-navy/10 shadow-sm"
        />
        <Counter />
      </div>
    </PageShell>
  );
}
