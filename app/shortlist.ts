import { cookies } from "next/headers";
import { products } from "./products";

export const SHORTLIST_COOKIE = "home-edit-shortlist";

export async function getShortlist(): Promise<string[]> {
  const cookieStore = await cookies();
  const savedValue = cookieStore.get(SHORTLIST_COOKIE)?.value;

  if (!savedValue) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(savedValue);

    if (!Array.isArray(parsed)) {
      return [];
    }

    // Accept only IDs that belong to actual products.
    return products
      .filter((product) => parsed.includes(product.id))
      .map((product) => product.id);
  } catch {
    // A damaged cookie should not crash the website.
    return [];
  }
}