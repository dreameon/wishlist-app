export type Product = {
  id: number;
  title: string;
  handle: string;
  // body_html: string;
  // published_at: string;
  // created_at: string;
  // updated_at: string;
  vendor: string;
  price: number;
  product_type: string;
  tags: string[];
  variants: Variant[];
  featured_image: string;
  media: Media[];
  options: { name: string; position: number; values: string[] }[];
};

export type Variant = {
  id: number;
  title: string;
  option1: string;
  option2: string | null;
  option3: string | null;
  sku: string;
  requires_shipping: boolean;
  taxable: boolean;
  featured_image: string | null;
  available: boolean;
  price: number;
  grams: number;
  compare_at_price: string | null;
  position: number;
  product_id: number;
  created_at: string;
  updated_at: string;
};

export type Image = {
  id: number;
  created_at: string;
  position: number;
  updated_at: string;
  product_id: number;
  variant_ids: number[];
  src: string;
  width: number;
  height: number;
  alt: string | null;
};

export type Media = {
  alt: string;
  aspect_ratio: number;
  id: number;
  media_type: "image" | "video";
  src: string;
};

export type Wish = {
  wishlist_id: number;
  wish_id: number;
  title: string;
  url: string;
  note: string;
  variants: { option: string; value: string }[];
};

export type VariantChosen = {
  option: string;
  value: string;
};

export type Wishlist = {
  title: string;
  wishlist_id: number;
  description: string | null;
};
