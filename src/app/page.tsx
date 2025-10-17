"use client";

import { useState } from "react";
import SideNav from "@/components/SideNav";
import View from "@/components/View";

export default function Home() {
  const [wishlistID, setWishlistID] = useState<number>();

  return (
    <div className="flex flex-row grow self-stretch gap-[16px]">
      <SideNav onClick={setWishlistID} />
      {wishlistID ? (
        <View wishlistID={wishlistID} />
      ) : (
        <p>
          No wishlist has been chosen yet. Please select a wishlist from the
          left panel!
        </p>
      )}
    </div>
  );
}
