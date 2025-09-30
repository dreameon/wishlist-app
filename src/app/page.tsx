"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Page from "@/app/[wishlistID]/page";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  fetchProduct,
  postWish,
  fetchWishlist,
  createWishlist,
} from "@/utils/queries";

function NewWishlistButton() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: createWishlist,
    onSuccess: (data) => {
      console.log(data.id);
      router.push(`/${data.id}`);
    },
  });

  return (
    <button
      className="flex flex-col px-[16px] py-[8px] rounded-[16px] bg-[#B0E7ED] text-[12px]/[16px] hover:bg-cyan-600"
      onClick={() => {
        mutation.mutate();
      }}
    >
      Create New Wishlist
    </button>
  );
}

export default function Home() {
  return <NewWishlistButton />;
}
