import { type NextRequest } from "next/server";
import { VariantChosen } from "@/utils/types";
import { db } from "@/utils/database";
import { sql } from "kysely";

// const sql = neon(`${process.env.DATABASE_URL}`);

// Create new wish
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ wishlistID: string }> }
) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get("action");

  if (action === "wish") {
    const { wishlistID } = await params;
    const wishlistItemTitle = searchParams.get("title");
    const productURL = searchParams.get("url");
    const variants: VariantChosen[] = await request.json();

    // Insert wish into database
    if (variants.length != 0) {
      const post = await db
        .with("wish_insert", (db) =>
          db
            .insertInto("wishes")
            .values({
              wishlist_id: Number(wishlistID),
              title: wishlistItemTitle!,
              url: productURL!,
            })
            .returning(["wish_id", "wishlist_id"])
        )
        .with("variant_insert", (db) =>
          db.insertInto("variants").values(
            variants.map((variant) => ({
              wish_id: db.selectFrom("wish_insert").select("wish_id"),
              option: variant.option,
              value: variant.value,
            }))
          )
        )
        .selectFrom("wish_insert")
        .select(["wish_id" as "wish_id", "wishlist_id" as "wishlist_id"])
        .execute();
    } else {
      const post = await db
        .with("wish_insert", (db) =>
          db
            .insertInto("wishes")
            .values({
              wishlist_id: Number(wishlistID),
              title: wishlistItemTitle!,
              url: productURL!,
            })
            .returning(["wish_id", "wishlist_id"])
        )
        .selectFrom("wish_insert")
        .select(["wish_id" as "wish_id", "wishlist_id" as "wishlist_id"])
        .execute();
    }

    return Response.json(`{${wishlistItemTitle}, ${productURL}}`);
  }
}

// Get wishlist and related wishes by wishlist ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ wishlistID: string }> }
) {
  const { wishlistID } = await params;

  const wishes = await db
    .selectFrom("wishes")
    .leftJoin("variants", "wishes.wish_id", "variants.wish_id")
    .select([
      "wishlist_id",
      "wishes.wish_id as wish_id",
      "title",
      "url",
      "note",
      sql<
        Record<string, any>[]
      >`json_agg_strict(jsonb_strip_nulls(jsonb_build_object('option', option, 'value', value)))`.as(
        "variants"
      ),
    ])
    .where("wishes.wishlist_id", "=", Number(wishlistID))
    .groupBy("wishes.wish_id")
    .orderBy("wishes.wish_id", "asc")
    .execute();

  const wishlist = await db
    .selectFrom("wishlists")
    .select(["wishlist_id", "title", "description"])
    .where("wishlist_id", "=", Number(wishlistID))
    .execute();

  return Response.json({ wishlist: wishlist[0], wishes: wishes });
}

// Delete wish by wish ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ wishlistID: string }> }
) {
  const searchParams = request.nextUrl.searchParams;
  const wishID = searchParams.get("wishID");
  const deletedWish = await db
    .with("deleted_variants", (db) =>
      db.deleteFrom("variants").where("variants.wish_id", "=", Number(wishID))
    )
    .with("delete_wish", (db) =>
      db
        .deleteFrom("wishes")
        .where("wishes.wish_id", "=", Number(wishID))
        .returning(["wishes.wishlist_id", "wishes.wish_id"])
    )
    .selectFrom("delete_wish")
    .select(["wishlist_id" as "wishlist_id", "wish_id" as "wish_id"])
    .execute();
  return Response.json(deletedWish);
}
