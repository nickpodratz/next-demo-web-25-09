export default function PokemonGridLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm sm:p-12">
        {children}
    </div>
  );
}