import { Product } from "@/utils/Types";

export default async function Temp() {
  const data: { products: Product[] } = await (
    await fetch("https://www.aromaespresso.ca/products.json?limit=250")
  ).json();

  return (
    <ul>
      {data.products.map((product) => (
        <li>{product.title}</li>
      ))}
    </ul>
  );
}

function Sync() {
  // code here as well
  const temp = Temp();
  // code here
}
