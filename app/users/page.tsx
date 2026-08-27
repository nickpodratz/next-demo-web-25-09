import Button from "../components/Button";
import PageShell from "../components/PageShell";
import SubmitButton from "../components/SubmitButton";
import { inputClass } from "../components/formStyles";
import authorService from "@/lib/author.service";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";
  const authors = await authorService.search(query);

  return (
    <PageShell
      title="Users"
      description="Search registered authors and open their profile pages."
    >
      <form action="/users" method="get" className="flex flex-col gap-3 sm:flex-row">
        <input
          name="q"
          defaultValue={query}
          placeholder="Search by name or email"
          className={`${inputClass} sm:flex-1`}
        />
        <SubmitButton>Search</SubmitButton>
      </form>

      <ul className="flex flex-col gap-3 pt-8">
        {authors.map(author => (
          <li
            key={author.id}
            className="flex flex-col gap-2 rounded-2xl border border-navy/10 bg-surface/50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold text-navy">{author.name}</p>
              <p className="text-sm text-navy-soft">{author.email}</p>
            </div>
            <Button href={`/users/${author.id}`}>View profile</Button>
          </li>
        ))}
      </ul>

      {authors.length === 0 && (
        <p className="pt-8 text-center text-navy-soft">
          No users match &ldquo;{query}&rdquo;.
        </p>
      )}
    </PageShell>
  );
}
