import { useState } from "react";
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
      <form className="flex flex-row self-stretch items-center justify-center gap-[16px]">
        <label>Add item by URL</label>
        <input
          type="url"
          name="wishURL"
          value={wishURL}
          onChange={(e) => setWishURL(e.target.value)}
          className="border border-[#D8D8D8] rounded-[24px] px-[16px] py-[8px] h-[48px] w-[300px]"
          required
        />
        <button
          onClick={handleSubmit}
          className="clickable flex flex-col px-[24px] py-[8px] rounded-[16px] bg-[#B0E7ED] text-[12px]/[16px]"
        >
          Submit URL
        </button>
      </form>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">Add a Wish</Dialog.Title>
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
