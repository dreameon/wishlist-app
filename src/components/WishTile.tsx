import { Product, Wish } from "../utils/types";
import { fetchProduct, deleteWish } from "@/utils/queries";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { findVariant } from "@/utils/helpers";

function CategoryChip({ collection }: { collection: string }) {
  return (
    <div className="flex flex-col align-start px-[16px] py-[8px] rounded-[16px] border border-[#D8D8D8] bg-[#FFFFFF] text-[12px]/[16px] ">
      {collection}
    </div>
  );
}

function ProductTitle({ title }: { title: string }) {
  return (
    <div className="text-(--font-primary) text-[18px] leading-[24px] truncate text-base">
      {title}
    </div>
  );
}

function ProductPrice({ price }: { price: string }) {
  return (
    <div className="text-(--font-primary) text-[16px] leading-[24px] font-bold ">
      {price}
    </div>
  );
}

function VariantInfo({
  variants,
}: {
  variants: { option: string; value: string }[];
}) {
  return (
    <div className="flex flex-col gap-[8px]">
      {variants.map(
        (variant, index) =>
          Object.keys(variant).length != 0 && (
            <table key={index} className="flex gap-[8px] grow">
              <thead className="flex-none w-[64px] self-stretch">
                <tr>
                  <th className="text-xs uppercase">{variant.option}</th>
                </tr>
              </thead>
              <tbody className="self-stretch grow">
                <tr>
                  <td className="text-[14px]/[16px]">{variant.value}</td>
                </tr>
              </tbody>
            </table>
          )
      )}
    </div>
  );
}

export default function WishTile({ wish }: { wish: Wish }) {
  // Refetch query upon submitting form
  const queryClient = useQueryClient();
  const mutationDelete = useMutation({
    mutationFn: deleteWish,
    onSuccess: async () => {
      // Invalidate the wishlist query to refetch the updated wishlist
      // https://tanstack.com/query/v5/docs/framework/react/guides/invalidations-from-mutations
      await queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  function handleDelete() {
    mutationDelete.mutate(wish);
  }

  const {
    isPending,
    isError,
    data: product,
    error,
  } = useQuery({
    queryKey: ["wishProduct", { wish }],
    queryFn: () => fetchProduct(wish.url),
  });

  if (isPending) {
    return (
      <div className="flex flex-col justify-center items-center rounded-(--radius-xs) p-[16px] border-[1px] border-(--color-card-border) bg-(--color-card-bg) hover:shadow-(--shadow) gap-[16px] shrink-0">
        Loading...
      </div>
    );
  }
  if (isError) {
    return `An error has occurred: ${error}`;
  }

  return (
    <a href={wish.url} target="_blank" rel="noopener noreferrer">
      <div className="flex flex-col rounded-(--radius-xs) p-[16px] border-[1px] border-(--color-card-border) bg-(--color-card-bg) hover:shadow-(--shadow) gap-[16px] shrink-0">
        <img
          src={
            product.options.length === wish.variants.length &&
            product.variants[0].title != "Default Title"
              ? `${findVariant(product, wish.variants)?.featured_image.src}`
              : product.featured_image
          }
          alt={
            product.media?.find((media) => media.src === product.featured_image)
              ?.alt
          }
          className="rounded-(--radius-s) aspect-square object-cover"
        />
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px] self-stretch">
            <ProductTitle title={wish.title} />
            <ProductPrice
              price={
                product.options.length === wish.variants.length &&
                product.variants[0].title != "Default Title"
                  ? `$${(
                      findVariant(product, wish.variants)?.price! / 100
                    ).toFixed(2)}`
                  : `$${(product.price / 100).toFixed(2)}`
              }
            />
          </div>
          {/* <VariantInfo variants={wish.variants} /> */}
          {/* <div className="flex flex-row gap-[8px] flex-wrap">
          {collection.map((collection, index) => (
            <CategoryChip key={index} collection={collection} />
          ))}
        </div> */}
          {/* <DeleteButton handleClick={handleDelete} /> */}
        </div>
      </div>
    </a>
  );
}
