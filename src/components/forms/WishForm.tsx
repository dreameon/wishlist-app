"use client";

import { useState } from "react";
import { Product, VariantChosen } from "@/utils/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProduct, postWish } from "@/utils/queries";
import { ToggleGroup } from "radix-ui";
import TextButton from "@/components/buttons/TextButton";

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

// Handles variant selection
function VariantChoice({
  variantTitle,
  variantValues,
  onVariantClick,
}: {
  variantTitle: string;
  variantValues: string[];
  onVariantClick: (variant: VariantChosen) => void;
}) {
  return (
    <div className="flex flex-row gap-[24px]">
      <div className="text-xs uppercase">{variantTitle}</div>
      <ToggleGroup.Root
        type="single"
        className="flex flex-row gap-[8px] min-w-0 "
        onValueChange={(variantValue) => {
          onVariantClick({ option: variantTitle, value: variantValue });
        }}
      >
        {variantValues.map((variantValue, index) => (
          <ToggleGroup.Item key={index} value={variantValue} asChild>
            <TextButton variant="Toggle" type="button">
              {variantValue}
            </TextButton>
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
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
      <div className="flex flex-col gap-[8px]">
        <h6>Choose desired variant(s)</h6>
        {product.options.map((option) => (
          <VariantChoice
            key={option.position}
            variantValues={option.values}
            variantTitle={option.name}
            onVariantClick={onVariantClick}
          ></VariantChoice>
        ))}
      </div>
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

  // TODO: update price and availability based on variant

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

  // Duplicated code
  function findVariant() {
    if (product) {
      const optionPos = variants.map(
        (selected) =>
          product.options.find((option) => option.name === selected.option)
            ?.position
      );

      const variantRes = product.variants.find((variant) => {
        const isVariantMatch = variants.every((selectedVariant, index) => {
          if (optionPos[index] == 1) {
            return variant.option1 == selectedVariant.value;
          } else if (optionPos[index] == 2) {
            return variant.option2 == selectedVariant.value;
          } else if (optionPos[index] == 3) {
            return variant.option3 == selectedVariant.value;
          } else {
            console.log(
              "An error has happened: option position not recognized."
            );
            return false;
          }
        });
        return isVariantMatch;
      });
      return variantRes;
    }
  }

  // Duplicated code
  // Fetch original product information for confirmation
  const { isPending, isError, data, error, refetch } = useQuery({
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
  if (product != data) {
    setProduct(data);
  }

  return (
    <div className="flex flex-row justify-start gap-[24px] self-stretch">
      <img
        src={product.featured_image}
        alt={
          product.media?.find((media) => media.src === product.featured_image)
            ?.alt
        }
        className="w-[256px] h-[256px] object-cover"
      />
      <div className="flex flex-col gap-[24px] self-stretch min-w-0">
        <WishHeader
          title={product.title}
          price={
            data.options.length === variants.length &&
            data.variants[0].title != "Default Title"
              ? `$${(findVariant()?.price! / 100).toFixed(2)}`
              : `$${(data.price / 100).toFixed(2)}`
          }
        />
        <VariantForm product={product} onVariantClick={handleClick} />
        {/* <label>Add Categories</label>
        <input
          type="c"
          name="wishURL"
          value={wishURL}
          onChange={(e) => setWishURL(e.target.value)}
          className="border border-[#D8D8D8] rounded-[16px] px-[16px] py-[8px] w-[300px]"
          required
        /> */}

        <button
          className="flex flex-col px-[16px] py-[8px] rounded-[16px] bg-[#B0E7ED] text-[12px]/[16px] hover:bg-cyan-600"
          onClick={addWish}
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
}
