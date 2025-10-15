import { NeonDialect } from "kysely-neon";
import { neon } from "@neondatabase/serverless";
import { type Generated, Kysely } from "kysely";

interface Database {
  wishes: {
    wishlist_id: number;
    wish_id: Generated<number>;
    title: string;
    url: string;
    note: string | null;
  };
  wishlists: {
    wishlist_id: Generated<number>;
    title: string;
  };
  users: {
    user_id: Generated<number>;
  };
  user_wishlist: {
    wishlist_id: number;
    wish_id: number;
  };
  variants: {
    wish_id: number;
    option: string;
    value: string;
  };
  categories: {
    category_id: Generated<number>;
    wish_id: number;
  };
  wish_categories: {
    wish_id: number;
    category_id: number;
  };
}

export const db = new Kysely<Database>({
  dialect: new NeonDialect({
    neon: neon(process.env.DATABASE_URL!),
  }),
});
