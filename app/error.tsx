"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-stone-50 px-6 py-20 text-center text-stone-900">
      <h1 className="text-4xl font-bold">
        Something went wrong
      </h1>

      <p className="mt-4 text-stone-600">
        Please try again or return to the product catalog.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-green-800 px-6 py-3 text-white hover:bg-green-900"
        >
          Try again
        </button>

        <Link
          href="/"
          className="rounded-lg border border-stone-300 px-6 py-3"
        >
          Back to products
        </Link>
      </div>
    </main>
  );
}