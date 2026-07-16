import PokemonCard from "./PokemonCard";
import { PokemonResult } from "./types/Pokemon";

export default async function PokemonGrid() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon');
  const { results } = await response.json()
  const pokemons: PokemonResult[] = results ?? []

  return (
        <div className="grid grid-cols-4 gap-4">
            {pokemons.map((p) => (
                <PokemonCard key={p.name} pokemonResult={p} />
            ))}
        </div>
  );
}
