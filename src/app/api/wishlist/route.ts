import { type NextRequest } from "next/server";
import { neon } from "@neondatabase/serverless";
import { db } from "@/utils/database";

export async function POST(request: NextRequest) {
  const newWishlist = await db
    .insertInto("wishlists")
    .defaultValues()
    .returning("wishlist_id as id")
    .execute();
  return Response.json(newWishlist[0]);
}

// export async function GET(request: NextRequest) {
//   // Get wishlist
//   const wishlist =
//     await sql`SELECT wishes.wish_id, title, url, note , json_agg_strict(jsonb_strip_nulls(jsonb_build_object('option', option, 'value', value))) AS variants FROM wishes LEFT JOIN variants ON wishes.wish_id = variants.wish_id GROUP BY wishes.wish_id`;
//   return Response.json(wishlist);
// }
