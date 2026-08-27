import Image from "next/image";
import { Pokemon, PokemonResult } from "./types/Pokemon";

export default async function PokemonCard({
  pokemonResult,
}: {
  pokemonResult: PokemonResult;
}) {
  const response = await fetch(pokemonResult.url, { cache: "force-cache" });
  const pokemon: Pokemon = await response.json();

  return (
    <div className="overflow-hidden rounded-2xl border border-navy/10 bg-surface/50 shadow-sm transition-transform hover:-translate-y-0.5">
      <div className="aspect-square bg-white p-4">
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemonResult.name}
          width={500}
          height={500}
          className="h-full w-full object-contain"
        />
      </div>
      <p className="border-t border-navy/10 py-3 text-center text-lg font-semibold capitalize text-navy">
        {pokemonResult.name}
      </p>
    </div>
  );
}
