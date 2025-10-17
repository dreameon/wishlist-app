import { createWishlist, fetchWishlists } from "@/utils/queries";
import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Wishlist } from "@/utils/types";
import { Dialog, ToggleGroup } from "radix-ui";
import WishlistForm from "@/components/WishlistForm";
import { IconButton } from "./BaseComponents";

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
        <IconButton path="M6 12H12M12 12H18M12 12V6M12 12V18" />
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
function SidebarItem({
  wishlist,
  ...rest
}: // onClick,
{
  wishlist: Wishlist;
  // onClick: (wishlistID: number) => void;
}) {
  const { title, wishlist_id } = wishlist;

  // Call handler (passed by Page) to change state of currently displayed wishlist
  // function handleClick() {
  //   onClick(wishlist_id);
  // }

  return (
    <button
      // onClick={handleClick}
      {...rest}
      className="flex h-[48px] px-[8px] justify-start items-center self-stretch rounded-(--radius-xs) bg-(--color-sidebar-item-bg-default) hover:bg-(--color-sidebar-item-bg-hover) active:bg-(--color-sidebar-item-bg-down) data-[state=on]:bg-(--color-sidebar-item-bg-active) truncate"
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
    <div className="flex flex-col self-stretch py-[24px] w-[234px] gap-[48px] shrink-0">
      <div className="flex px-[8px] justify-between items-center self-stretch">
        <h4>Your Wishlists</h4>
        <NewWishlistButton onClick={onClick} />
      </div>
      <ToggleGroup.Root
        type="single"
        onValueChange={(wishlistID) => {
          onClick(Number(wishlistID));
        }}
        className="flex flex-col grow items-start self-stretch gap-[8px]"
      >
        {wishlists.map((wishlist, index) => (
          <ToggleGroup.Item
            key={index}
            value={String(wishlist.wishlist_id)}
            asChild
          >
            <SidebarItem wishlist={wishlist} key={index} />
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </div>
  );
}
