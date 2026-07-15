import Link from "next/link";

export default function Button({href, children}: {href: string, children: React.ReactNode}) {
    return (
        <Link
            href={href}
            className="border rounded-2xl bg-gray-200 text-gray-900 px-4 py-2"
        >
            {children}
        </Link>
    )
}