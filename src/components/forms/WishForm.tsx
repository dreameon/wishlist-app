"use client";

import { useState } from "react";
import { Product, VariantChosen } from "@/utils/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProduct, postWish } from "@/utils/queries";
import { ToggleGroup } from "radix-ui";
import TextButton from "@/components/buttons/TextButton";
import { findVariant } from "@/utils/helpers";
import FormWrapper from "./FormWrapper";
import ToggleInput from "./inputs/ToggleInput";
import FormField from "./FormField";
import TextAreaInput from "./inputs/TextAreaInput";

function WishTitle({ title }: { title: string }) {
  return <h1>{title}</h1>;
}
function WishPrice({ price }: { price: string }) {
  return <h2>{price}</h2>;
}

function WishHeader({ title, price }: { title: string; price: string }) {
  return (
    <div className="flex flex-col self-stretch">
      <WishTitle title={title} />
      <WishPrice price={price} />
    </div>
  );
}

function VariantForm({
  product,
  onVariantClick,
}: {
  product: Product;
  onVariantClick: (variant: VariantChosen) => void;
}) {
  return (
    product.variants[0].title != "Default Title" && (
      <FormField
        name="variants"
        label="Choose Desired Variant(s)"
        required={false}
      >
        <div className="flex flex-col gap-[8px]">
          {product.options.map((option) => (
            <ToggleInput
              key={option.position}
              options={option.values}
              title={option.name}
              onValueChange={(variantValue: string) => {
                onVariantClick({ option: option.name, value: variantValue });
              }}
            />
          ))}
        </div>
      </FormField>
    )
  );
}

export default function WishForm({
  wishURL,
  wishlistID,
  onSubmit,
}: {
  wishURL: string;
  wishlistID: string;
  onSubmit: (isOpen: boolean) => void;
}) {
  const [product, setProduct] = useState<Product>({} as Product);
  const [wishTitle, setWishTitle] = useState<string>("");
  const [variants, setVariants] = useState<VariantChosen[]>([]);
  const [note, setNote] = useState<string>("");

  const url = new URL(wishURL!);
  const baseURL = url.origin; // e.g. "https://dfgrinders.ca"
  const productHandle = url.pathname; // e.g. "dosing-cup"
  const productURL = `${baseURL}${productHandle}`;

  // TODO: update availability based on variant
  // TODO: add note functionality

  // Refetch query upon submitting form
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postWish,
    onSuccess: async () => {
      // Invalidate the wishlist query to refetch the updated wishlist
      // https://tanstack.com/query/v5/docs/framework/react/guides/invalidations-from-mutations
      await queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  // Set selected variants
  async function handleClick(variant: VariantChosen) {
    const option = variant.option;
    const value = variant.value;
    if (value) {
      if (variants.map((variant) => variant.option).includes(option)) {
        const newVariants = variants.map((variant) => ({
          option: variant.option,
          value: option === variant.option ? value : variant.value,
        }));
        setVariants(newVariants);
      } else {
        setVariants([...variants, { option: option, value: value }]);
      }
    } else {
      setVariants(variants.filter((variant) => variant.option != option));
    }
  }

  // Form submit handler: add wish item to profile
  async function addWish(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    mutation.mutate({
      url: productURL,
      title: wishTitle.length === 0 ? product.title : wishTitle,
      variants: variants,
      wishlistID: wishlistID,
    });
    onSubmit(false); // open the dialog
  }

  // Fetch original product information for confirmation
  const {
    isPending,
    isError,
    data: productData,
    error,
    refetch,
  } = useQuery({
    queryKey: ["product", { productURL }],
    queryFn: () => fetchProduct(productURL),
  });
  if (isPending) {
    return "Loading...";
  }
  if (isError) {
    return `An error has occurred: ${error}`;
  }
  // Only update if anything has changed
  if (product != productData) {
    setProduct(productData);
  }

  return (
    <div className="flex flex-row justify-start gap-[24px] self-stretch">
      <img
        src={
          productData.options.length === variants.length &&
          productData.variants[0].title != "Default Title"
            ? `${findVariant(productData, variants)?.featured_image.src}`
            : productData.featured_image
        }
        alt={
          productData.media?.find(
            (media) => media.src === productData.featured_image
          )?.alt
        }
        className="w-[400px] h-[400px] aspect-square object-cover"
      />
      <FormWrapper>
        <WishHeader
          title={product.title}
          price={
            productData.options.length === variants.length &&
            productData.variants[0].title != "Default Title"
              ? `$${(findVariant(product, variants)?.price! / 100).toFixed(2)}`
              : `$${(productData.price / 100).toFixed(2)}`
          }
        />

        <div className="flex flex-col grow self-stretch gap-[24px]">
          <div className="flex grow self-stretch gap-[8px]">
            <VariantForm product={product} onVariantClick={handleClick} />
          </div>

          <div className="flex grow self-stretch gap-[8px]">
            <FormField name="notes" label="Note(s)" required={false}>
              <TextAreaInput
                value={note ?? ""}
                placeholder="Add a note"
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              />
            </FormField>
          </div>
        </div>

        <div className="flex flex-row gap-[16px] items-start">
          <TextButton type="button" variant="Secondary" onClick={addWish}>
            Cancel
          </TextButton>
          <TextButton type="submit" variant="Primary" onClick={addWish}>
            Save
          </TextButton>
        </div>
      </FormWrapper>
    </div>
  );
}
