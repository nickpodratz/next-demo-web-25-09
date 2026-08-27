import { notFound } from "next/navigation";
import Button from "@/app/components/Button";
import PageShell from "@/app/components/PageShell";
import authorService from "@/lib/author.service";
import { getCurrentUser } from "@/lib/auth";
import Profile, { avatarGradient, pageGradient } from "./Profile";
import ProfileEditor from "./ProfileEditor";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const authorId = Number(id);
  if (!Number.isInteger(authorId) || authorId <= 0) notFound();

  const author = await authorService.findById(authorId);
  if (!author) notFound();

  const currentUser = await getCurrentUser();
  const isOwnProfile = currentUser?.id === author.id;

  return (
    <PageShell
      title="Profile"
      description={
        isOwnProfile
          ? "View and update your account details."
          : `${author.name}'s public profile.`
      }
      contentClassName={`bg-gradient-to-br via-transparent ${pageGradient(author.id)}`}
    >
      <div className="mx-auto w-full max-w-md">
        <div
          className={`mx-auto mb-8 flex size-20 items-center justify-center rounded-full bg-gradient-to-br ${avatarGradient(author.id)} text-3xl font-bold text-white shadow-lg`}
        >
          {author.name.charAt(0).toUpperCase()}
        </div>

        {isOwnProfile ? (
          <ProfileEditor author={author} />
        ) : (
          <Profile author={author} />
        )}

        <div className="flex flex-wrap justify-center gap-3 pt-8">
          <Button href="/users">Back to Users</Button>
          <Button href="/">Back to Home</Button>
        </div>
      </div>
    </PageShell>
  );
}
