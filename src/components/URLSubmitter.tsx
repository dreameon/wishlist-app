import { useState } from "react";
import { PrimaryButton } from "./BaseComponents";
import { Dialog } from "radix-ui";
import WishForm from "@/components/WishForm";

export default function URLSubmitter({ wishlistID }: { wishlistID: number }) {
  const [open, setOpen] = useState(false); // For modal form
  const [wishURL, setWishURL] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOpen(true); // open the dialog
  }

  return (
    <div>
      <form className="w-[827px] p-[24px] flex flex-col items-end justify-center gap-[24px] border-[1px] border-(--color-modal-border) bg-(--color-modal-bg) rounded-(--radius-xs) shadow-(--shadow)">
        <div className="flex flex-col gap-[8px] items-start self-stretch">
          <h6 className="text-(--color-text-tertiary)">
            Enter a product page URL from any Shopify store to get started!
          </h6>
          <input
            type="url"
            name="wishURL"
            value={wishURL}
            onChange={(e) => setWishURL(e.target.value)}
            className="flex p-[8px] items-start self-stretch bg-(--color-input-bg-default) border-[1px] rounded-(--radius-xs) border-(--color-input-border-default)"
            required
          />
        </div>

        <PrimaryButton
          onClick={handleSubmit}
          value="Submit URL"
          type="submit"
        />
      </form>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/25 fixed inset-0" />
          <Dialog.Content className="flex flex-col w-[912px] bg-(--color-modal-bg) rounded-(--radius-xs) absolute top-1/2 left-1/2 -translate-1/2 p-[24px] gap-[24px]">
            <Dialog.Title className="">Add a Wish</Dialog.Title>
            <WishForm
              wishURL={wishURL}
              wishlistID={String(wishlistID)}
              onSubmit={setOpen}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
