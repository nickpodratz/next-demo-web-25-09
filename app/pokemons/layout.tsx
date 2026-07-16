export default function PokemonGridLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="border p-16">
        {children}
    </div>
  );
}