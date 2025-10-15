import { useEffect, useState } from "react";

export default function WishlistForm({
  onSubmit,
}: {
  onSubmit: (title: string) => void;
}) {
  const [wishlistTitle, setWishlistTitle] = useState<string>("");

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    onSubmit(wishlistTitle);
  }

  return (
    <div className="flex gap-[48px] p-[48px] rounded-[16px] border border-[#D8D8D8] bg-white">
      <form className="flex flex-row self-stretch items-center justify-center gap-[16px]">
        <label>Enter Wishlist Title</label>
        <input
          type="text"
          name="wishlist-title"
          value={wishlistTitle}
          onChange={(e) => setWishlistTitle(e.target.value)}
          className="border border-[#D8D8D8] rounded-[24px] px-[16px] py-[8px] h-[48px] w-[300px]"
          required
        />
        <button
          onClick={handleSubmit}
          className="clickable flex flex-col px-[24px] py-[8px] rounded-[16px] bg-[#B0E7ED] text-[12px]/[16px]"
        >
          Save Title
        </button>
      </form>
    </div>
  );
}
