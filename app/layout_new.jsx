export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <header style={{ 
          background: "#eee",
          padding: "1rem",
          textAlign: "center" 
        }}>
          <h1>Next Demo</h1>
        </header>

        <main style={{ padding: "2rem" }}>
          {children}
        </main>

        <footer style={{
          background: "#eee",
          padding: "1rem",
          textAlign: "center" 
        }}>
          © 2026 Syntax
        </footer>
      </body>
    </html>
  );
}