"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { products } from "./products";
import { getShortlist, SHORTLIST_COOKIE } from "./shortlist";

export async function updateShortlist(
  formData: FormData
): Promise<void> {
  const productId = formData.get("productId");
  const intent = formData.get("intent");

  // Validate data received from the browser.
  if (
    typeof productId !== "string" ||
    !products.some((product) => product.id === productId)
  ) {
    throw new Error("Invalid product.");
  }

  if (intent !== "save" && intent !== "remove") {
    throw new Error("Invalid shortlist action.");
  }

  const currentShortlist = await getShortlist();

  const updatedShortlist =
    intent === "save"
      ? Array.from(new Set([...currentShortlist, productId]))
      : currentShortlist.filter((id) => id !== productId);

  const cookieStore = await cookies();

  cookieStore.set(
    SHORTLIST_COOKIE,
    JSON.stringify(updatedShortlist),
    {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    }
  );

  revalidatePath("/");
  revalidatePath(`/products/${productId}`);
}