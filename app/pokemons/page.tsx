import { Suspense } from "react";
import PokemonGrid from "./PokemonsGrid";
import Spinner from "./Spinner";

export default async function PokemonPage() {
  return (
    <>
        <h1 className="pb-6 text-4xl font-bold tracking-tight">Pokemons</h1>
        <Suspense fallback={<Spinner/>} >
            <PokemonGrid />
        </Suspense>
    </>
     );
}
