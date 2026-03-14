import { hashTheItem } from "@/lib/utils";
import { Product, Topping } from "../../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem extends Pick<
  Product,
  "_id" | "name" | "image" | "priceConfiguration"
> {
  product: Product;
  chosenConfiguration: {
    priceConfiguration: {
      [key: string]: string;
    };
    selectedToppings: Topping[];
  };
  qty: number;
  hash?: string;
}

export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const hash = hashTheItem(action.payload);
      const newItem = {
        ...action.payload,
        hash: hash,
      };

      window.localStorage.setItem(
        "cartItems",
        JSON.stringify([...state.cartItems, newItem]),
      );
      return {
        cartItems: [...state.cartItems, newItem],
      };
    },
    setInitialCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems.push(...action.payload);
    },
    changeQty: (
      state,
      action: PayloadAction<{ hash: string; qty: number }>,
    ) => {
      const index = state.cartItems.findIndex(
        (item) => item.hash === action.payload.hash,
      );

      if (action.payload.qty === 0) {
        state.cartItems.splice(index, 1);
        window.localStorage.setItem(
          "cartItems",
          JSON.stringify(state.cartItems),
        );
        return;
      }

      state.cartItems[index].qty = Math.max(
        1,
        state.cartItems[index].qty + action.payload.qty,
      );

      window.localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, setInitialCartItems, changeQty } = cartSlice.actions;
export default cartSlice.reducer;
