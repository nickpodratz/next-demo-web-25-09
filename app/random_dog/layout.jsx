export default function RootLayout({ children }) {
  return (
        <>
        <div style={{
          background: "#FF0000",
          padding: "1rem",
          textAlign: "center"
         }}>
          <h1>Random Dog Demo</h1>
        </div>
        
        <div style={{ padding: "2rem" }}>
            {children}
        </div>
    </>
  );
}