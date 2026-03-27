"use client";
import { useAppSelector } from "@/lib/store/hooks";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CartCounter = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const searchParams = useSearchParams();
  const tenantId = searchParams.get("restaurantId");

  return (
    <>
      <div className="relative">
        <Link href={`/cart?restaurantId=${tenantId}`}>
          <ShoppingBasket className="hover:text-primary" />
        </Link>
        <span className="absolute -top-4 -right-5 h-6 w-6 flex items-center justify-center rounded-full bg-primary font-bold text-white">
          {cartItems.length}
        </span>
      </div>
    </>
  );
};

export default CartCounter;
