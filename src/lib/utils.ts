import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFromPrice(product: Product): number {
  const basePrice = Object.entries(product.priceConfiguration)
    .filter(([key, value]) => {
      return value.priceType === "base";
    })
    .reduce((acc, [key, value]) => {
      const smallestPrice = Math.min(...Object.values(value.availableOptions));
      return acc + smallestPrice;
    }, 0);
  return basePrice;
}
