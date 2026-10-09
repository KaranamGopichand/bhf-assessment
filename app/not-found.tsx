import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-stone-50 px-6 py-20 text-center text-stone-900">
      <p className="font-semibold text-green-800">
        404 — Not found
      </p>

      <h1 className="mt-4 text-4xl font-bold">
        We could not find that product
      </h1>

      <p className="mt-4 text-stone-600">
        Please return to the catalog and choose another product.
      </p>

      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-green-800 px-6 py-3 text-white hover:bg-green-900"
      >
        Back to products
      </Link>
    </main>
  );
}