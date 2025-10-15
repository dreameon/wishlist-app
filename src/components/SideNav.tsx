import { createWishlist, fetchWishlists } from "@/utils/queries";
import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Wishlist } from "@/utils/types";
import { Dialog } from "radix-ui";
import WishlistForm from "@/components/WishlistForm";

function IconPlaceholder() {
  return <div className="w-[128px] h-[128px] bg-[#D9D9D9]"></div>;
}

function NewWishlistButton({
  onClick,
}: {
  onClick: (wishlistID: number) => void;
}) {
  const [open, setOpen] = useState(false); // For modal form

  // Creates an empty wishlist
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (wishlistTitle: string) => createWishlist(wishlistTitle),
    onSuccess: async (data) => {
      setOpen(false);
      onClick(data.id);
      await queryClient.invalidateQueries({ queryKey: ["wishlists"] });
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="clickable flex flex-col px-[16px] py-[8px] rounded-[16px] bg-[#B0E7ED] text-[12px]/[16px] hover:bg-cyan-600">
          Create New Wishlist
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Create Wishlist</Dialog.Title>
          <WishlistForm
            onSubmit={(title: string) => {
              mutation.mutate(title);
            }}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// Interactive tile to click to display wishlist
function WishlistTile({
  wishlist,
  onClick,
}: {
  wishlist: Wishlist;
  onClick: (wishlistID: number) => void;
}) {
  const { title, wishlist_id } = wishlist;

  // Call handler (passed by Page) to change state of currently displayed wishlist
  function handleClick() {
    onClick(wishlist_id);
  }

  return (
    <button
      onClick={handleClick}
      className="clickable flex justify-center h-[48px] items-center self-stretch px-[24px]"
    >
      {title ?? `Wishlist ${wishlist_id}`}
    </button>
  );
}

export default function SideNav({
  onClick,
}: {
  onClick: (wishlistID: number) => void;
}) {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);

  // Get list of wishlists to display on side navigation panel
  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["wishlists"],
    queryFn: () => fetchWishlists(),
  });
  if (isPending) {
    return "Loading...";
  }
  if (isError) {
    return "An error has occurred";
  }
  // Only update if anything has changed
  if (wishlists != data) {
    setWishlists(data);
  }

  return (
    <div className="flex flex-col gap-[48px] py-[64px] w-[256px] items-center bg-[#F2F2F2]">
      <IconPlaceholder />
      <div className="flex flex-col items-center self-stretch px-[16px] gap-[48px]">
        <NewWishlistButton onClick={onClick} />
        <div className="flex flex-col items-start self-stretch gap-[8px]">
          {wishlists.map((wishlist, index) => (
            <WishlistTile wishlist={wishlist} onClick={onClick} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
