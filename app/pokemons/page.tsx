import { Suspense } from "react";
import PokemonGrid from "./PokemonsGrid";

export default async function Page() {
  return (
    <main className="border p-16">
        <Suspense
            fallback={
            <p className="text-orange-600 text-2xl font-bold text-center">
                Loading pokemon...
            </p>
            }
        >
            <PokemonGrid />
        </Suspense>
    </main>  );
}
