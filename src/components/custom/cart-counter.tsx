"use client";
import { increment } from "@/lib/store/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";

const CartCounter = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.cart.value);

  const handleClick = () => {
    dispatch(increment());
  };
  return (
    <>
      <div className="relative">
        <Link href="/cart">
          <ShoppingBasket className="hover:text-primary" />
        </Link>
        <span className="absolute -top-4 -right-5 h-6 w-6 flex items-center justify-center rounded-full bg-primary font-bold text-white">
          {count}
        </span>
        <button onClick={handleClick}>increment</button>
      </div>
    </>
  );
};

export default CartCounter;
