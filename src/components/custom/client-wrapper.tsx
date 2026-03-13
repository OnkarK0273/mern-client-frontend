"use client";

import dynamic from "next/dynamic";

// We move the dynamic import here
const CartCounter = dynamic(() => import("./cart-counter"), {
  ssr: false,
});

export default function DynamicCartCounter() {
  return <CartCounter />;
}
