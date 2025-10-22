import {
  createWishlist,
  fetchWishlists,
  updateWishlist,
} from "@/utils/queries";
import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Wishlist } from "@/utils/types";
import { Dialog, ToggleGroup, DropdownMenu } from "radix-ui";
import WishlistForm from "@/components/forms/WishlistForm";
import Icon from "./Icon";
import IconButton from "./buttons/IconButton";
import DialogForm from "@/components/forms/DialogForm";
import { WishlistDeleteForm } from "@/components/forms/WishlistDeleteForm";

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
    <div>
      <IconButton icon="plus" type="primary" onClick={() => setOpen(true)} />
      <DialogForm
        open={open}
        setOpen={setOpen}
        title="New Wishlist"
        size="small"
      >
        <WishlistForm
          setOpen={setOpen}
          action="Create"
          onSubmit={(title: string) => mutation.mutate(title)}
        />
      </DialogForm>
    </div>
  );
}

function DropdownMenuItem(props: any) {
  const { ...rest } = props;
  return (
    <DropdownMenu.Item
      {...rest}
      className="flex flex-row gap-[8px] justify-start items-center outline-0 pl-[8px] pr-[32px] py-[8px] hover:bg-(--color-dropdown-item-bg-hover) rounded-(--radius-xs) text-(--color-dropdown-item-text)"
    >
      {props.children}
    </DropdownMenu.Item>
  );
}

// Interactive tile to click to display wishlist
function SidebarItem({ wishlist, ...rest }: { wishlist: Wishlist }) {
  const { title, wishlist_id } = wishlist;
  const [editModalOpen, setEditModalOpen] = useState(false); // For edit modal form
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // For delete modal form

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (wishlist: Wishlist) => updateWishlist(wishlist),
    onSuccess: async (data) => {
      setEditModalOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["wishlists"] }); // TODO: handle if deleted wishlist is currently open one
    },
  });

  return (
    <>
      <div
        // onClick={handleClick}
        {...rest}
        className="flex h-[48px] px-[8px] hover:*:block text-(--color-sidebar-item-text) justify-between items-center self-stretch rounded-(--radius-xs) bg-(--color-sidebar-item-bg-default) hover:bg-(--color-sidebar-item-bg-hover) active:bg-(--color-sidebar-item-bg-down) data-[state=on]:bg-(--color-sidebar-item-bg-active) truncate"
      >
        {title ?? `Wishlist ${wishlist_id}`}
        <DropdownMenu.Root modal={false}>
          <DropdownMenu.Trigger asChild>
            <IconButton
              type="standard"
              icon="ellipsis"
              className="data-[state=open]:block hidden"
              onClick={(e: MouseEvent) => e.stopPropagation()}
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="relative p-[8px] flex flex-col justify-content border-[1px] border-(--color-modal-border) bg-(--color-modal-bg) rounded-(--radius-xs) shadow-(--shadow)">
              <DropdownMenuItem
                onClick={(e: MouseEvent) => {
                  setEditModalOpen(true);
                  e.stopPropagation();
                }}
              >
                <Icon
                  icon="pencil"
                  size={16}
                  strokeColor="stroke-(--color-dropdown-item-icon)"
                />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e: MouseEvent) => {
                  setDeleteModalOpen(true);
                  e.stopPropagation();
                }}
              >
                <Icon
                  icon="trash"
                  size={16}
                  strokeColor="stroke-(--color-dropdown-item-icon)"
                />
                Delete
              </DropdownMenuItem>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
      <DialogForm
        open={editModalOpen}
        setOpen={setEditModalOpen}
        title="Edit Wishlist"
        size="small"
      >
        <WishlistForm
          wishlist={wishlist}
          setOpen={setEditModalOpen}
          action="Edit"
          onSubmit={(wishlist: Wishlist) => {
            mutation.mutate(wishlist);
          }}
        />
      </DialogForm>

      <DialogForm
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        title="Delete Wishlist"
        size="small"
      >
        <WishlistDeleteForm wishlist={wishlist} setOpen={setDeleteModalOpen} />
      </DialogForm>
    </>
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
