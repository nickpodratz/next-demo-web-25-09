import Button from "./components/Button";
import DogButton from "./random_dog/DogButton";

export default function Home() {
  return (
    <>
      <main>
        <h1 className="text-4xl pb-4">Next Demo</h1>
        <DogButton/>
        <Button href="/login">Login</Button>
      </main>
    </>
  );
}
