import Button from "./components/Button";

export default function NotFound() {
    return (
        <section className="flex flex-col items-start gap-4 py-12">
            <p className="rounded-full bg-lemon px-3 py-1 font-mono text-xs font-bold text-navy">404</p>
            <h1 className="text-4xl font-bold tracking-tight">Not found</h1>
            <p className="text-navy-soft">There is nothing to see here.</p>
            <Button href="/">Back to Home</Button>
        </section>
    )
}
