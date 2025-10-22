import { useEffect, useState } from "react";
import FormWrapper from "./FormWrapper";
import FormField from "./FormField";
import TextInput from "./inputs/TextInput";
import TextAreaInput from "./inputs/TextAreaInput";
import { Form } from "radix-ui";
import { Wishlist } from "@/utils/types";
import TextButton from "../buttons/TextButton";

export default function WishlistForm({
  onSubmit,
  setOpen,
  wishlist,
  action,
  ...rest
}: {
  setOpen: (isOpen: boolean) => void;
  wishlist?: Wishlist;
} & (
  | { action: "Create"; onSubmit: (toSubmit: string) => void }
  | { action: "Edit"; onSubmit: (toSubmit: Wishlist) => void }
)) {
  const wishlistID = wishlist?.wishlist_id;
  const [wishlistTitle, setWishlistTitle] = useState<string>(
    wishlist?.title ?? ""
  );
  const [wishlistDescription, setWishlistDescription] = useState<string>(
    wishlist?.description ?? ""
  );

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (action === "Create") onSubmit(wishlistTitle);
    if (action === "Edit")
      onSubmit(
        {
          wishlist_id: wishlistID!,
          title: wishlistTitle,
          description: wishlistDescription,
        }!
      );
  }

  return (
    <FormWrapper {...rest}>
      <FormField name="title" label="Title">
        <TextInput
          value={wishlistTitle}
          placeholder="Add a title"
          onChange={(e) => setWishlistTitle(e.target.value)}
          required
        />
      </FormField>
      <FormField name="description" label="Description">
        <TextAreaInput
          name="description"
          value={wishlistDescription ?? ""}
          placeholder="Add a description (optional)"
          onChange={(e) => {
            setWishlistDescription(e.target.value);
          }}
        />
      </FormField>

      {action === "Edit" && (
        <div className="flex flex-row gap-[16px] items-start">
          <TextButton
            type="button"
            variant="Secondary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </TextButton>
          <Form.Submit asChild>
            <TextButton type="submit" variant="Primary" onClick={handleSubmit}>
              Save
            </TextButton>
          </Form.Submit>
        </div>
      )}
      {action === "Create" && (
        <div className="flex flex-row gap-[16px] items-start">
          <TextButton
            type="button"
            variant="Secondary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </TextButton>
          <Form.Submit asChild>
            <TextButton type="submit" variant="Primary" onClick={handleSubmit}>
              Create
            </TextButton>
          </Form.Submit>
        </div>
      )}
    </FormWrapper>
  );
}
