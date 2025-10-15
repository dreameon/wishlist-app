import { Product, Wish, Wishlist, VariantChosen } from "./types";

export async function fetchProduct(productURL: string): Promise<Product> {
  const response: Response = await fetch(`/api/data/?productURL=${productURL}`);
  const data: Product = await response.json();
  return data;
}

// export async function fetchWishlist(): Promise<Wish[]> {
//   const response: Response = await fetch(`/api/wishlist`, { method: "GET" });
//   const data: Wish[] = await response.json();
//   return data;
// }

// export async function postWish(wish: {
//   url: string;
//   title: string;
//   variants: VariantChosen[];
// }) {
//   const response: Response = await fetch(
//     `/api/wishlist/?url=${wish.url}&title=${wish.title}`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(wish.variants),
//     }
//   );
//   const data = await response.json();
//   return data;
// }

export async function postWish(wish: {
  url: string;
  title: string;
  variants: VariantChosen[];
  wishlistID: string;
}) {
  const response: Response = await fetch(
    `/api/wishlist/${wish.wishlistID}/?action=wish&url=${wish.url}&title=${wish.title}&wishlistID=${wish.wishlistID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wish.variants),
    }
  );
  const data = await response.json();
  return data;
}

export async function deleteWish(wish: Wish) {
  const response: Response = await fetch(
    `/api/wishlist/${wish.wishlist_id}/?action=delete-wish&wishID=${wish.wish_id}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();
  return data;
}

export async function createWishlist(
  wishlistTitle?: string
): Promise<{ id: number }> {
  const response: Response = await fetch(
    `/api/wishlist/?action=new-wishlist&wishlist-title=${wishlistTitle}`,
    {
      method: "POST",
    }
  );
  const data: { id: number } = await response.json();
  return data;
}

export async function fetchWishlist(wishlistID: string | undefined) {
  const response: Response = await fetch(`/api/wishlist/${wishlistID}/`, {
    method: "GET",
  });
  const data: { wishlist: Wishlist; wishes: Wish[] } = await response.json();
  return data;
}

export async function fetchWishlists() {
  const response: Response = await fetch(`/api/wishlist/`, {
    method: "GET",
  });
  const data: {
    title: string;
    wishlist_id: number;
  }[] = await response.json();
  return data;
}
