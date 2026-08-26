export default function RandomDogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="bg-red-600 p-4 text-center text-white">
        <h1>Random Dog Demo</h1>
      </div>

      <div className="p-8">{children}</div>
    </>
  );
}
