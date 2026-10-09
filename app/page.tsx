import Link from "next/link";
import { products } from "./products";
import { getShortlist } from "./shortlist";

type HomeProps = {
  searchParams: Promise<{
    view?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const shortlist = await getShortlist();
  const { view } = await searchParams;

  const showSavedOnly = view === "shortlist";

  const displayedProducts = showSavedOnly
    ? products.filter((product) => shortlist.includes(product.id))
    : products;

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-12 text-stone-900">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-800">
          BHF Assessment Project
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          The Home Edit
        </h1>

        <p className="mt-4 text-lg text-stone-600">
          Discover comfortable essentials for your home.
        </p>

        <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-5">
          <p className="font-semibold text-green-900">
            Your shortlist: {shortlist.length} saved{" "}
            {shortlist.length === 1 ? "product" : "products"}
          </p>

          <p className="mt-2 text-sm text-green-800">
            Open a product to add it to your shortlist or remove it.
          </p>
        </div>

        <nav
          aria-label="Product views"
          className="mt-6 flex flex-wrap gap-3"
        >
          <Link
            href="/"
            aria-current={!showSavedOnly ? "page" : undefined}
            className={`rounded-lg border px-5 py-3 font-medium ${
              !showSavedOnly
                ? "border-green-800 bg-green-800 text-white"
                : "border-stone-300 bg-white text-stone-700"
            }`}
          >
            All products
          </Link>

          <Link
            href="/?view=shortlist"
            aria-current={showSavedOnly ? "page" : undefined}
            className={`rounded-lg border px-5 py-3 font-medium ${
              showSavedOnly
                ? "border-green-800 bg-green-800 text-white"
                : "border-stone-300 bg-white text-stone-700"
            }`}
          >
            My shortlist ({shortlist.length})
          </Link>
        </nav>

        {displayedProducts.length === 0 ? (
          <section className="mt-8 rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center">
            <h2 className="text-2xl font-semibold">
              Your shortlist is empty
            </h2>

            <p className="mt-3 text-stone-600">
              Browse the products and save something you like.
            </p>

            <Link
              href="/"
              className="mt-5 inline-block font-medium text-green-800 underline"
            >
              Browse all products
            </Link>
          </section>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedProducts.map((product) => (
              <article
                key={product.id}
                className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-medium text-green-800">
                  {product.category}
                </p>

                <h2 className="mt-3 text-2xl font-semibold">
                  {product.name}
                </h2>

                <p className="mt-3 text-stone-600">
                  {product.description}
                </p>

                <p className="mt-5 text-xl font-bold">
                  ${product.price}
                </p>

                {shortlist.includes(product.id) && (
                  <p className="mt-3 text-sm font-semibold text-green-800">
                    ✓ In your shortlist
                  </p>
                )}

                <Link
                  href={`/products/${product.id}`}
                  className="mt-5 inline-block rounded-lg bg-green-800 px-5 py-3 font-medium text-white hover:bg-green-900"
                >
                  View details
                </Link>
              </article>
            ))}
          </div>
        )}

        <p className="mt-10 text-sm text-stone-500">
          Demo catalog — fictional products and prices.
          Your shortlist is saved in this browser for 30 days.
        </p>
      </div>
    </main>
  );
}