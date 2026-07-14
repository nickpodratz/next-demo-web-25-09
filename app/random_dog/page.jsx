import Counter from "./Counter";

export default async function DogPage() {
  const res = await fetch("https://dog.ceo/api/breeds/image/random");
  const data = await res.json();

  return (
    <main style={{
        textAlign: "center", 
        fontSize: "1.5rem",
        padding: "2rem",
    }}>
      <h1>Random Dog</h1>
      <img
        src={data.message}
        alt="Random Dog"
        style={{ 
            maxWidth: "400px", 
            borderRadius: "12px",
            display: "block",
            margin: "1rem auto",
         }}
      />
      <Counter />
    </main>
  );
}