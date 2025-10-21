import { type NextRequest } from "next/server";
import { neon } from "@neondatabase/serverless";
import { db } from "@/utils/database";

// Create a new wishlist
export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const wishlistTitle = searchParams.get("wishlist-title");

  if (wishlistTitle) {
    const newWishlist = await db
      .insertInto("wishlists")
      .values({ title: wishlistTitle })
      .returning("wishlist_id as id")
      .execute();
    return Response.json(newWishlist[0]);
  } else {
    const newWishlist = await db
      .insertInto("wishlists")
      .defaultValues()
      .returning("wishlist_id as id")
      .execute();
    return Response.json(newWishlist[0]);
  }
}

// Update wishlist info
export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { wishlist_id, title, description } = body;

  if (!wishlist_id) {
    return Response.json(
      { error: "wishlist_id is required for updating a wishlist" },
      { status: 400 }
    );
  }

  await db
    .updateTable("wishlists")
    .set({ title, description })
    .where("wishlist_id", "=", wishlist_id)
    .execute();

  const updatedWishlist = await db
    .selectFrom("wishlists")
    .select(["wishlist_id", "title", "description"])
    .where("wishlist_id", "=", wishlist_id)
    .execute();

  return Response.json(updatedWishlist[0]);
}

// Get all wishlists
export async function GET(request: NextRequest) {
  const wishlists = await db
    .selectFrom("wishlists")
    .select(["wishlist_id", "title", "description"])
    .orderBy("wishlist_id", "asc")
    .execute();
  return Response.json(wishlists);
}

// Delete a wishlist
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const wishlistID = searchParams.get("wishlist-id");

  if (wishlistID) {
    // Delete all information associated with this wishlist in order of variants > wishes > wishlist
    await db
      .deleteFrom("variants")
      .where(
        "wish_id",
        "in",
        db
          .selectFrom("wishes")
          .select("wish_id")
          .where("wishlist_id", "=", Number(wishlistID))
      )
      .execute();

    await db
      .deleteFrom("wishes")
      .where("wishlist_id", "=", Number(wishlistID))
      .execute();

    await db
      .deleteFrom("wishlists")
      .where("wishlist_id", "=", Number(wishlistID))
      .execute();

    return Response.json({ message: "Wishlist deleted successfully" });
  } else {
    return Response.json(
      { error: "Wishlist ID is required to delete a wishlist" },
      { status: 400 }
    );
  }
}
