import { type Pokemon } from "./types/Pokemon";

export default async function PokemonGrid() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon');
  const { results } = await response.json()
  const pokemons: Pokemon[] = results ?? []

  // Simuliere langsame UI mit Fehler.
    await new Promise((resolve) => {
        setTimeout(resolve, 4000);
    }).then(() => {
        throw new Error('Something went wrong');
    });


  return (
    <div className="grid grid-cols-4">
      {pokemons.map((p) => (
        <div key={p.name} className="border border-black h-16 p-2">{p.name}</div>
      ))}
    </div>
  );
}
