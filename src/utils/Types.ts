export type Product = {
  available: boolean;
  body: string;
  compare_at_price_max: string | null;
  compare_at_price_min: string | null;
  handle: string;
  id: number;
  image: string;
  price: string;
  price_max: string;
  price_min: string;
  tags: string[];
  title: string;
  type: string;
  url: string;
  variants: Variant[];
  vendor: string;
  featured_image: Image;
};

export type Variant = {
  available: boolean;
  compare_at_price: string | null;
  id: number;
  image: string | null;
  price: string;
  title: string;
  url: string;
  featured_image: Image;
};

export type Image = {
  alt: string | null;
  aspect_ratio: number | null;
  height: number | null;
  url: string | null;
  width: number | null;
};

export type WishlistItem = {
  id: number;
  title: string;
  src: string;
  collection: string[];
};
