export default function Profile({
  author,
}: {
  author: { id: number; name: string; email: string };
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <h2 className="text-2xl font-semibold text-navy">{author.name}</h2>
      <p className="text-navy-soft">{author.email}</p>
    </div>
  );
}

const gradients = [
  { avatar: "from-violet-500 to-fuchsia-500", page: "from-violet-500/15 to-fuchsia-500/15" },
  { avatar: "from-sky-500 to-cyan-400", page: "from-sky-500/15 to-cyan-400/15" },
  { avatar: "from-emerald-500 to-teal-400", page: "from-emerald-500/15 to-teal-400/15" },
  { avatar: "from-amber-500 to-orange-500", page: "from-amber-500/15 to-orange-500/15" },
  { avatar: "from-rose-500 to-pink-500", page: "from-rose-500/15 to-pink-500/15" },
];

export function avatarGradient(id: number) {
  return gradients[id % gradients.length].avatar;
}

export function pageGradient(id: number) {
  return gradients[id % gradients.length].page;
}
