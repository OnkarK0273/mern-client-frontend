import { createSlice } from "@reduxjs/toolkit";

export interface CartSlice {
  value: number;
}

const initialState: CartSlice = {
  value: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { increment } = cartSlice.actions;
export default cartSlice.reducer;
