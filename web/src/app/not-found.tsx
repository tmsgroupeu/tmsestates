import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <p className="mt-3 text-neutral-600">The page you’re looking for doesn’t exist or was moved.</p>
      <div className="mt-6">
        <Link href="/" className="rounded-lg border px-4 py-2">Back to home</Link>
      </div>
    </main>
  );
}
