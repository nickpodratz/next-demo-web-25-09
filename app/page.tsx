import Button from "./components/Button";
import DogButton from "./random_dog/DogButton";

export default function Home() {
  return (
    <section>
      <h1 className="pb-4 text-5xl font-bold tracking-tight">Next Demo</h1>
      <DogButton />
      <Button href="/login">Login</Button>
    </section>
  );
}
