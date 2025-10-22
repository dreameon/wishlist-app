import { useState } from "react";
import { Form } from "radix-ui";
import FormWrapper from "@/components/forms/FormWrapper";
import FormField from "@/components/forms/FormField";
import TextInput from "@/components/forms/inputs/TextInput";
import WishForm from "@/components/forms/WishForm";
import TextButton from "@/components/buttons/TextButton";
import DialogForm from "@/components/forms/DialogForm";

export default function URLSubmitter({ wishlistID }: { wishlistID: number }) {
  const [open, setOpen] = useState(false); // For modal form
  const [wishURL, setWishURL] = useState<string>("");
  const [urlError, setURLError] = useState<string | null>(null);

  function ErrorMessage() {
    return (
      <div className="flex flex-col items-start self-stretch">
        <p className="text-(--color-error-text)">{urlError}</p>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    try {
      const isURL = new URL(wishURL);
    } catch (_) {
      e.preventDefault();
      setURLError("Please enter a valid URL.");
      return false;
    }
    e.preventDefault();
    setURLError(null);
    setOpen(true); // open the dialog
  }

  return (
    <div className="">
      <FormWrapper>
        <div className="flex flex-col gap-[4px] items-end self-stretch">
          <FormField
            name="url"
            label="Enter a product page URL from any Shopify store to get started!"
          >
            <TextInput
              value={wishURL}
              placeholder="Add URL"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setWishURL(e.target.value)
              }
              required={true}
              type="url"
            />
          </FormField>
          {/* {urlError && <ErrorMessage />} */}
        </div>
        <Form.Submit asChild>
          <TextButton variant="Primary" onClick={handleSubmit} type="submit">
            Submit URL
          </TextButton>
        </Form.Submit>
      </FormWrapper>
      {/* <form className="w-[827px] p-[24px] flex flex-col items-end justify-center gap-[24px] border-[1px] border-(--color-modal-border) bg-(--color-modal-bg) rounded-(--radius-xs) shadow-(--shadow)">
        <div className="flex flex-col gap-[8px] items-start self-stretch">
          <h6 className="text-(--color-text-tertiary)"></h6>
          <input
            type="url"
            name="wishURL"
            value={wishURL}
            onChange={(e) => setWishURL(e.target.value)}
            className="flex p-[8px] items-start self-stretch bg-(--color-input-bg-default) border-[1px] rounded-(--radius-xs) border-(--color-input-border-default)"
            required
          />
        </div>

        <PrimaryButton onClick={handleSubmit} type="submit">
          Submit URL
        </PrimaryButton>
      </form> */}
      <DialogForm open={open} setOpen={setOpen} title="Add Wish">
        <WishForm
          wishURL={wishURL}
          wishlistID={String(wishlistID)}
          onSubmit={setOpen}
        />
      </DialogForm>
    </div>
  );
}
