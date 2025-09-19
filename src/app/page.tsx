"use client";

import { useEffect, useState } from "react";
import { Product } from "../utils/Types";
import fuzzysort from "fuzzysort";
import WishlistItem from "./WishlistItem";

async function getProduct(baseURL: string, productHandle: string) {
  const response: Response = await fetch(
    `/api/data/?baseURL=${baseURL}&productHandle=${productHandle}`
  );
  const data: Product = await response.json();
  return data;
}

export default function Home() {
  //DONE: extract domain name and product name from url
  //TODO: go through all product pages (/products.json?page=n, where n is an integer) until no products are returned
  //TODO: process variant information (productHandle?variant=variantID)
  //TODO: store wishlisted item in a database
  //TODO: create a wishlist page that displays all wishlisted items
  //TODO: figure out how many calls to do using meta.json
  //DONE: look at search term (/search/suggest.json?q={query}&resources[type]=product)
  const [wishlistItem, setWishlistItem] = useState<Product>({} as Product);
  const [productURL, setProductURL] = useState<string>("");
  const [baseURL, setBaseURL] = useState<string>("");
  const [productHandle, setProductHandle] = useState<string>("");

  function addItem(event: React.FormEvent<HTMLFormElement>) {
    // store url and product
    event.preventDefault();
    const url = new URL(productURL);
    setBaseURL(url?.origin!); // e.g. "https://dfgrinders.ca"
    setProductHandle(url?.pathname.split("/")[2]!); // e.g. "dosing-cup"
    // const variantID = url?.searchParams.get("variant"); // e.g. "43619308011613"
  }

  // get product object from shop
  useEffect(() => {
    if (productHandle && baseURL) {
      getProduct(baseURL, productHandle).then((item) => setWishlistItem(item));
      console.log(baseURL, productHandle);
    }
  }, [productHandle, baseURL]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen gap-[32px] px-16 py-16">
      <form onSubmit={addItem} className="flex flex-col gap-[8px]">
        <label>Add item by URL</label>
        <input
          type="url"
          name="productURL"
          value={productURL}
          onChange={(e) => setProductURL(e.target.value)}
          className="border border-[#D8D8D8] rounded-[16px] px-[16px] py-[8px] w-[300px]"
          required
        />
        <button
          type="submit"
          className="flex flex-col px-[16px] py-[8px] rounded-[16px] bg-[#B0E7ED] text-[12px]/[16px]"
        >
          Enter
        </button>
      </form>
      {Object.keys(wishlistItem).length != 0 && (
        <WishlistItem
          productName={wishlistItem.title}
          productImg={wishlistItem.featured_image.url!}
          price={Number(wishlistItem.price)}
          categories={["category 1", "category 2"]}
        />
      )}
    </div>
  );
}
