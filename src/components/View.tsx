"use client";

import { useEffect, useState } from "react";
import { Wish, Wishlist } from "@/utils/types";
import WishlistItem from "@/components/WishlistItem";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchWishlist } from "@/utils/queries";
import URLSubmitter from "./URLSubmitter";

export default function View({ wishlistID }: { wishlistID: number }) {
  //DONE: process variant information (productHandle?variant=variantID)
  //DONE: look at search term (/search/suggest.json?q={query}&resources[type]=product)
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [wishlistTitle, setWishlistTitle] = useState<string>("");

  // Fetch wishlist from database
  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["wishlist", , { wishlistID }],
    queryFn: () => fetchWishlist(String(wishlistID)),
  });
  if (isPending) {
    return "Loading...";
  }
  if (isError) {
    return "An error has occurred";
  }
  // Only update if anything has changed
  if (wishes != data.wishes) {
    setWishes(data.wishes);
  }
  if (wishlistTitle != data.wishlist.title) {
    setWishlistTitle(data.wishlist.title);

    // else {
    //   setWishlistTitle(`Wishlist ${data.wishlist.wishlist_id}`);
    // }
  }

  return (
    <div className="flex flex-col items-start grow min-h-screen gap-[32px] px-[32px] py-[32px]">
      <URLSubmitter wishlistID={wishlistID} />
      <h1 className="flex h-[128px] justify-center items-center self-stretch">
        {wishlistTitle ?? `Wishlist ${wishlistID}`}
      </h1>
      <div className="flex gap-[24px] self-stretch flex-wrap">
        {wishes.map((wish, index) => (
          <WishlistItem wish={wish} key={index} />
        ))}
      </div>
    </div>
  );
}
