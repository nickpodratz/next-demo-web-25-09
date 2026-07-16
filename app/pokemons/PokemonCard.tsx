import Image from "next/image";
import { Pokemon, PokemonResult } from "./types/Pokemon";

export default async function PokemonCard({ pokemonResult }: { pokemonResult: PokemonResult }) {
    const response = await fetch(pokemonResult.url)
    const pokemon: Pokemon = await response.json()

    return (
        <div className="border rounded-2xl aspect-square">
            <Image src={pokemon.sprites.front_default} alt={pokemonResult.name} width={500} height={500} />
            <div className="text-center w-full text-2xl pb-4">{pokemonResult.name}</div>
        </div>
    )
}