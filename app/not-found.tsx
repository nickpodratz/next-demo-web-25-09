import Button from "./components/Button";
import PageShell from "./components/PageShell";

export default function NotFound() {
  return (
    <PageShell bare>
      <div className="flex flex-col items-start gap-4 rounded-3xl bg-white p-8 shadow-sm sm:p-12">
        <p className="rounded-full bg-lemon px-3 py-1 font-mono text-xs font-bold text-navy">
          404
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-navy">Not found</h1>
        <p className="text-navy-soft">There is nothing to see here.</p>
        <Button href="/">Back to Home</Button>
      </div>
    </PageShell>
  );
}
