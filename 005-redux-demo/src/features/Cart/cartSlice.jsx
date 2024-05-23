import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    amount: 0,
    total: 0,
    totalAmount: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart(state, action) {
      const fabricId = action.payload;
      try {
        const existingFabric = state.cart.find(
          (fabric) =>
            fabric.id === fabricId.id && fabric.color === fabricId.color
        );
        if (existingFabric) {
          existingFabric.amount++;
          existingFabric.totalPrice += fabricId.price;
          state.totalAmount++;
          state.totalPrice += fabricId.price;
        } else {
          state.cart.push({
            id: fabricId.id,
            name: fabricId.name,
            price: fabricId.price,
            color: fabricId.color,
            amount: 1,
            totalPrice: fabricId.price,
          });
            state.totalAmount++;
            state.totalPrice += fabricId.price;
        }
      } catch (e) {
        return e;
      }
    },
    clearCart(state) {
      state.cart = [];
      state.totalAmount = 0;
      state.totalPrice = 0;
    }
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
