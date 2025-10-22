"use client";

import { useEffect, useState } from "react";
import { Wish, Wishlist } from "@/utils/types";
import WishTile from "@/components/WishTile";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchWishlist } from "@/utils/queries";
import URLSubmitter from "./URLSubmitter";
import TextButton from "@/components/buttons/TextButton";
import { Popover } from "radix-ui";
import LoadingContainer from "@/components/LoadingContainer";

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
    return <LoadingContainer>Loading...</LoadingContainer>;
  }
  if (isError) {
    return <LoadingContainer>An error has occurred</LoadingContainer>;
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
            <TextButton type="button" variant="Primary">
              Add Wish
            </TextButton>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              sideOffset={8}
              align="end"
              className="absolute right-0 w-[827px] p-[24px] flex flex-col justify-center border-[1px] border-(--color-modal-border) bg-(--color-modal-bg) rounded-(--radius-xs) shadow-(--shadow)"
            >
              <URLSubmitter wishlistID={wishlistID} />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
      <div className="gap-[16px] self-stretch grid grid-cols-4  ">
        {wishes.map((wish, index) => (
          <WishTile wish={wish} key={index} />
        ))}
      </div>
    </div>
  );
}
