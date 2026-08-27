import { Suspense } from "react";
import PageShell from "../components/PageShell";
import PokemonGrid from "./PokemonsGrid";
import Spinner from "./Spinner";

export default async function PokemonPage() {
  return (
    <PageShell
      title="Pokemons"
      description="Browse the first generation of Pokémon fetched from the PokéAPI."
    >
      <Suspense fallback={<Spinner />}>
        <PokemonGrid />
      </Suspense>
    </PageShell>
  );
}
