"use client";

import { useState } from "react";
import SideNav from "@/components/SideNav";
import View from "@/components/View";
import LoadingContainer from "@/components/LoadingContainer";

export default function Home() {
  const [wishlistID, setWishlistID] = useState<number>();

  return (
    <div className="flex flex-row grow self-stretch gap-[16px]">
      <SideNav onClick={setWishlistID} />
      {wishlistID ? (
        <View wishlistID={wishlistID} />
      ) : (
        <LoadingContainer>
          No wishlist has been chosen yet. Please select a wishlist or create a
          new one from the left panel!
        </LoadingContainer>
      )}
    </div>
  );
}
