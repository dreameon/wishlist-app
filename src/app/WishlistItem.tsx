import React from "react";

function CategoryChip({ category }: { category: string }) {
  return (
    <div className="flex flex-col align-start px-[16px] py-[8px] rounded-[16px] border border-[#D8D8D8] bg-[#FFFFFF] text-[12px]/[16px] ">
      {category}
    </div>
  );
}

export default function WishlistItem({
  productName,
  productImg,
  price,
  categories,
}: {
  productName: string;
  productImg: string;
  price: number;
  categories: string[];
}) {
  return (
    <div className="flex flex-col rounded-[16px] overflow-hidden border border-[#D8D8D8] bg-[#FFFFFF] w-[240px] gap-[16px]">
      <img src={productImg} alt={productName} />
      <div className="flex flex-col px-[16px] pb-[16px] gap-[16px]">
        <div>
          <b>{productName}</b>
          <p>${price}</p>
        </div>
        <div className="flex flex-row gap-[8px] flex-wrap">
          {categories.map((category, index) => (
            <CategoryChip key={index} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
