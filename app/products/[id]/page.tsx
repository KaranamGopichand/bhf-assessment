import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "../../products";
import { getShortlist } from "../../shortlist";
import { updateShortlist } from "../../actions";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  const shortlist = await getShortlist();
  const isSaved = shortlist.includes(product.id);

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-12 text-stone-900">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="font-medium text-green-800 underline"
        >
          ← Back to products
        </Link>

        <article className="mt-8 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-800">
            {product.category}
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            {product.name}
          </h1>

          <p className="mt-6 text-lg leading-8 text-stone-600">
            {product.description}
          </p>

          <p className="mt-6 text-3xl font-bold">
            ${product.price}
          </p>

          <form action={updateShortlist} className="mt-8">
            <input
              type="hidden"
              name="productId"
              value={product.id}
            />

            <input
              type="hidden"
              name="intent"
              value={isSaved ? "remove" : "save"}
            />

            <button
              type="submit"
              aria-pressed={isSaved}
              className="rounded-lg bg-green-800 px-6 py-3 font-medium text-white hover:bg-green-900"
            >
              {isSaved
                ? "Remove from shortlist"
                : "Add to shortlist"}
            </button>
          </form>

          <p className="mt-4 text-sm font-medium text-green-800">
            {isSaved
              ? "This product is in your shortlist."
              : "Save this product to revisit later."}
          </p>

          <p className="mt-6 text-sm text-stone-500">
            Your shortlist is saved in this browser for 30 days.
          </p>

          <p className="mt-3 text-sm text-stone-500">
            Demo product — not available for purchase.
          </p>
        </article>
      </div>
    </main>
  );
}