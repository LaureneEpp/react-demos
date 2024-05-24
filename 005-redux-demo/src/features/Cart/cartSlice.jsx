import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    img: "",
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
            img: fabricId.img,
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
    },
    removeFromCart(state, action) {
      const { id, color } = action.payload;
      const existingFabric = state.cart.find(
        (fabric) => fabric.id === id && fabric.color === color
      );
      if (existingFabric) {
        state.totalAmount -= existingFabric.amount;
        state.totalPrice -= existingFabric.totalPrice;
        state.cart = state.cart.filter(
          (fabric) =>
            !(fabric.id === id && fabric.color === color)
        );
      }
    },
  },
});

export const { addToCart, clearCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
