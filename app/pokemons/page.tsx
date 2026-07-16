import { type Pokemon } from "./types/Pokemon";

export default async function Pokemon() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon');
  const { results } = await response.json()
  const pokemons: Pokemon[] = results ?? []

  // Simuliere langsame UI.
  await new Promise((resolve) => {
    setTimeout(resolve, 4000);
  });

  return (
    <div className="flex flex-col items-center justify-center">
      {pokemons.map((p) => (
        <p key={p.name}>{p.name}</p>
      ))}
    </div>
  );
}
