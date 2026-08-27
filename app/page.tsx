import Button from "./components/Button";
import PageShell from "./components/PageShell";
import DogButton from "./random_dog/DogButton";

export default function Home() {
  return (
    <PageShell bare>
      <div className="rounded-3xl bg-white p-8 shadow-sm sm:p-12">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-lilac">
          Web 25-09
        </p>
        <h1 className="pt-4 text-5xl font-bold tracking-tight text-navy">
          Next Demo
        </h1>
        <p className="pt-4 max-w-xl text-lg leading-relaxed text-navy-soft">
          Explore routing, server actions, data fetching, and authentication in
          this Next.js playground.
        </p>
        <div className="flex flex-wrap gap-3 pt-8">
          <DogButton />
          <Button href="/login">Login</Button>
          <Button href="/blog">Blog</Button>
          <Button href="/pokemons">Pokemons</Button>
          <Button href="/users">Users</Button>
        </div>
      </div>
    </PageShell>
  );
}
