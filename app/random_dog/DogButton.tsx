import Link from "next/link";

export default function DogButton() {
    return (
        <Link
            href="/random_dog"
            className="border rounded-2xl bg-gray-200 text-gray-900"
        >
            Random Dogs
        </Link>
    )
}