import { Product } from "@/utils/types";
import { type NextRequest } from "next/server";

// export async function GET(request: NextRequest) {
//   const searchParams = await request.nextUrl.searchParams;
//   const baseURL = searchParams.get("baseURL")!;
//   const productHandle = searchParams.get("productHandle")!;
//   const response: Response = await fetch(
//     `${baseURL}/search/suggest.json?q=${productHandle}&resources[type]=product`
//   );
//   const data: { resources: { results: { products: Product[] } } } =
//     await response.json();
//   const filteredData = data.resources.results.products.filter((product) => {
//     product;
//   });
//   return Response.json(data.resources.results.products[0]);
// }

export async function GET(request: NextRequest) {
  const searchParams = await request.nextUrl.searchParams;
  const productURL = searchParams.get("productURL")!;
  const response: Response = await fetch(`${productURL}.js`);
  const data: Product = await response.json();
  return Response.json(data);
}
