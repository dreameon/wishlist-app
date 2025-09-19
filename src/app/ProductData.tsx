import { Product } from "@/utils/Types";

export async function getItem(productHandle: string, baseURL: string) {
  const data: { products: Product[] } = await (
    await fetch(
      baseURL +
        `/search/suggest.json?q=${productHandle}&resources[type]=product`
    )
  ).json();
  return data.products[0];
}
