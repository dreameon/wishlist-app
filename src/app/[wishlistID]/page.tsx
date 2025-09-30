"use client";

import { useEffect, useState } from "react";
import { Product, Wish } from "@/utils/types";
import WishlistItem from "@/components/WishlistItem";
import { useFormStatus } from "react-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  fetchProduct,
  postWish,
  fetchWishlist,
  createWishlist,
} from "@/utils/queries";
import WishlistForm from "@/components/WishlistForm";
import { useParams } from "next/navigation"; // useParams is always string

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex flex-col px-[16px] py-[8px] rounded-[16px] bg-[#B0E7ED] text-[12px]/[16px]"
    >
      {pending ? "Submitting..." : "Submit URL"}
    </button>
  );
}

export default function Page() {
  //DONE: process variant information (productHandle?variant=variantID)
  //DONE: look at search term (/search/suggest.json?q={query}&resources[type]=product)
  const [wishURL, setWishURL] = useState<string>("");
  const [wishlist, setWishlist] = useState<Wish[]>([]);
  const [confirm, setConfirm] = useState<boolean>(false);

  const params = useParams<{ wishlistID: string }>();
  const wishlistID = params.wishlistID;

  // Fetch wishlist from database
  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["wishlist", , { wishlistID }],
    queryFn: () => fetchWishlist(wishlistID),
  });
  if (isPending) {
    return "Loading...";
  }
  if (isError) {
    return "An error has occurred";
  }
  // Only update if anything has changed
  if (wishlist != data) {
    setWishlist(data);
  }

  async function displayConfirmForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setConfirm(true);
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen gap-[32px] px-16 py-16">
      <form onSubmit={displayConfirmForm} className="flex flex-col gap-[8px]">
        <label>Add item by URL</label>
        <input
          type="url"
          name="wishURL"
          value={wishURL}
          onChange={(e) => setWishURL(e.target.value)}
          className="border border-[#D8D8D8] rounded-[16px] px-[16px] py-[8px] w-[300px]"
          required
        />
        <Submit />
      </form>
      {confirm && wishURL && (
        <WishlistForm wishURL={wishURL} wishlistID={wishlistID} />
      )}
      <div className="flex gap-[24px] self-stretch flex-wrap">
        {wishlist.map((wish, index) => (
          <WishlistItem wish={wish} key={index} />
        ))}
      </div>
    </div>
  );
}
