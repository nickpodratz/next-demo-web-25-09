import { Suspense } from "react";
import PokemonGrid from "./PokemonsGrid";
import Spinner from "./Spinner";

export default async function PokemonPage() {
  return (
    <>
        <h1 className="text-6xl pb-8 pl-2">Pokemons</h1>
        <Suspense fallback={<Spinner/>} >
            <PokemonGrid />
        </Suspense>
    </>
     );
}
