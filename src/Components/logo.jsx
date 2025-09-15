import { BiSolidShoppingBags } from "react-icons/bi";

export default function ShopEaseLogo() {
  return (
    <div className="flex items-center gap-2 sm:gap-3 select-none w-fit">
      {/* Icon inside styled circle */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-700 shadow-lg">
        <BiSolidShoppingBags className="text-white text-2xl sm:text-3xl" />
      </div>

      {/* Brand text */}
      <div className="flex flex-col leading-tight">
        <span className="font-extrabold text-xl sm:text-2xl text-green-500">
          ShopEase
        </span>
      </div>
    </div>
  );
}
