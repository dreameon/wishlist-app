import { useState } from "react";
import TextButton from "../buttons/TextButton";
import FormWrapper from "./FormWrapper";
import { Wishlist } from "@/utils/types";
import { deleteWishlist } from "@/utils/queries";

export function WishlistDeleteForm({
  wishlist,
  setOpen,
  ...rest
}: {
  wishlist: Wishlist;
  setOpen: (isOpen: boolean) => void;
}) {
  return (
    <FormWrapper {...rest}>
      <div className="flex flex-row gap-[16px] items-start">
        <TextButton
          type="button"
          variant="Secondary"
          onClick={() => setOpen(false)}
        >
          Cancel
        </TextButton>
        <TextButton
          type="submit"
          variant="Primary"
          onClick={() => deleteWishlist(wishlist.wishlist_id)}
        >
          Delete
        </TextButton>
      </div>
    </FormWrapper>
  );
}
