"use client";

import { useEffect, useState } from "react";
import { Wish, Wishlist } from "@/utils/types";
import WishlistItem from "@/components/WishlistItem";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchWishlist } from "@/utils/queries";
import URLSubmitter from "./URLSubmitter";
import { PrimaryButton } from "./BaseComponents";
import { Popover } from "radix-ui";

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
    <div className="flex flex-col grow items-start self-stretch min-h-screen gap-[40px] p-[16px]">
      <div className="flex justify-between items-center self-stretch">
        <h1 className="flex justify-center items-center self-stretch">
          {wishlistTitle ?? `Wishlist ${wishlistID}`}
        </h1>
        <Popover.Root>
          <Popover.Trigger asChild>
            <PrimaryButton value="Add Wish" />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              sideOffset={8}
              align="end"
              className="absolute right-0"
            >
              <URLSubmitter wishlistID={wishlistID} />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
      <div className="gap-[16px] self-stretch grid grid-cols-4  ">
        {wishes.map((wish, index) => (
          <WishlistItem wish={wish} key={index} />
        ))}
      </div>
    </div>
  );
}
